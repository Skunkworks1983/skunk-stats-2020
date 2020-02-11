const express = require('express');
const path = require('path');
const cors = require('cors');
const glob = require('glob');
const utils = require('../lib/utils');
const customRes = require('../lib/customResponses');
const matchesDB = require('../lib/matchesDB');
const keys = require('../key');
const axios = require('axios');

var router = express.Router();

router.use(cors());
router.options('*', cors());

// send scoutBoss 
router.get('/scoutBoss', (req, res) => {
  res.sendFile(path.join(__dirname, '/../', 'public', 'ScoutBoss.html'))
})

// send scoutBoss as a downloadable file
router.get('/scoutBoss/download', (req, res) => {
  res.download(path.join(__dirname, '/../', 'public', 'ScoutBoss.html'))
})

// send match prediction tool
router.get('/matchPredictions', (req, res) => {
  res.sendFile(path.join(__dirname, '/../', 'public', 'matchPrediction.html'))
})

// send custom match schedule in case TBA doesn't have one
router.get('/schedule', (req, res) => {
  res.sendFile(path.join(__dirname, '/../', 'public', 'schedule.json'));
})

// get data submitted from scouting app
router.put('/data/match', (req, res) => {
  let autoShots = utils.sumShots(req.body.autoShots);
  let teleShots = utils.sumShots(req.body.teleShots);
  matchesDB.query(`INSERT INTO matches2020 VALUES ('${utils.escape(req.body.event)}', ${utils.escape(req.body.match)}, '${utils.escape(req.body.scout)}', ${utils.escape(req.body.team)}, '${utils.escape(req.body.alliance)}', ${utils.escape(req.body.station)}, ${utils.escape(req.body.crossLine)}, ${autoShots.total}, ${autoShots.lower}, ${autoShots.outer}, ${autoShots.inner}, ${teleShots.total}, ${teleShots.lower}, ${teleShots.outer}, ${teleShots.inner}, ${utils.escape(req.body.rotation)}, ${utils.escape(req.body.position)}, ${utils.escape(req.body.park)}, ${utils.escape(req.body.hang)}, ${utils.escape(req.body.doubleHang)}, ${utils.escape(req.body.noShow)}, ${utils.escape(req.body.deadBot)}, ${utils.escape(req.body.stuckBall)});`, (err, result) => {
    if (err) {
      if (err.errno === 1062) {
        customRes.dbDuplicate(res);
      } else {
        customRes.serverError(res);
        return console.warn(err);
      }
    } else {
      customRes.success(res);
    }
  })
})

// get submitted shooting data
router.put('/data/shooting', (req, res) => {
  if (req.header('x-stats-team')) {
    for (let i = 0; i < req.body.autoHistory.length; i++) {
      matchesDB.query(`INSERT INTO shootingData VALUES ('auto', ${utils.escape(req.body.autoShots[i].week)}, ${parseInt(utils.escape(req.header('x-stats-team')))}, ${utils.hitPercentage(req.body.autoShots[i])}, ${req.body.autoHistory[i].x}, ${req.body.autoHistory[i].y});`, (err, result) => {
        if (err) {
          if (err.errno === 1062) {
            customRes.dbDuplicate(res);
          } else {
            customRes.serverError(res);
            console.warn(err);
          }
        }
      })
    }
    for (let j = 0; j < req.body.teleHistory.length; j++) {
      matchesDB.query(`INSERT INTO shootingData VALUES ('tele', ${utils.escape(req.body.teleShots[j].week)}, ${parseInt(utils.escape(req.header('x-stats-team')))}, ${utils.hitPercentage(req.body.teleShots[j])}, ${req.body.teleHistory[j].x}, ${req.body.teleHistory[j].y});`, (err, result) => {
        if (err) {
          if (err.errno === 1062) {
            customRes.dbDuplicate(res);
          } else {
            customRes.serverError(res);
          }
        } else {
          customRes.success(res);
        }
      })
    }
  } else {
    customRes.invalidHeaders(res);
  }
})

// Send urls to the images
router.get('/robot/:team', (req, res) => {
  glob(`${__dirname}/../public/robots/${utils.handleDigits(req.params.team)}*.jpg`, (err, files) => {
    if (err) {
      console.warn(err);
      return customRes.serverError(res);
    } else if (files.length > 0) {
      let absPaths = new Array;
      files.forEach(element => absPaths.push(`http://${customRes.path}/robots/${element.split('/').pop()}`));
      // res.send(JSON.stringify(absPaths.sort((a, b) => b.split('.')[1] - a.split('.')[1])));
      res.json(absPaths);
    } else {
      res.json([`http://${customRes.path}/robots/default.jpg`]);
    }
  })
})

// TBA request redirect
router.get('/tba', (req, res) => {
  if (req.header('x-stats-tba-redirect-url')) {
    axios({
        method: 'GET',
        url: req.header('x-stats-tba-redirect-url'),
        headers: {
          'X-TBA-Auth-Key': keys.TBA_key,
          'User-Agent': 'Skunk-Stats'
        }
      })
      .then(response => {
        res.status(200).json(response.data);
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 304) {
            return res.status(304).end()
          } else {
            return customRes.TBAerror(res, err.response.status, err.response.data);
          }
        } else {
          console.log(err);
          return customRes.errorUnspecified(res);
        }
      })
  } else {
    return customRes.invalidHeaders(res);
  }
})

module.exports = router;