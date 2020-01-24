const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const glob = require('glob');
const utils = require('../lib/utils');
const bodyParser = require('body-parser');
const customRes = require('../lib/customResponses');
const matchesDB = require('../lib/matchesDB');
const keys = require('../key');
const axios = require('axios');

var router = express.Router();

router.use(cors());
router.options('*', cors());

router.use(bodyParser.json());

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
      matchesDB.query(`INSERT INTO shootingData VALUES ('auto', ${parseInt(utils.escape(req.header('x-stats-team')))}, ${utils.hitPercentage(req.body.autoShots[i])}, ${req.body.autoHistory[i].x}, ${req.body.autoHistory[i].y});`, (err, result) => {
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
      matchesDB.query(`INSERT INTO shootingData VALUES ('tele', ${parseInt(utils.escape(req.header('x-stats-team')))}, ${utils.hitPercentage(req.body.teleShots[j])}, ${req.body.teleHistory[j].x}, ${req.body.teleHistory[j].y});`, (err, result) => {
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
router.get('/robot', (req, res) => {
  if (req.header('team')) {
    // Find all files matching the glob
    glob(`${__dirname}/../public/robots/${req.header('team')}*.jpg`, (err, files) => {
      console.log(files);
      if (err) {
        console.warn(err);
        customRes.serverError(res);
      } else if (files.length > 0) {
        absPaths = [];
        files.forEach(element => absPaths.push(`${customRes.path}/public/robots/${element}`));
        res.send(JSON.stringify(absPaths));
      } else {
        res.send(JSON.stringify([`${customRes.path}/robots/default.jpg`]));
      }
    })
  } else {
    customRes.invalidHeaders(res);
  }
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
        },
        validateStatus: status => {
          return status == 200
        }
      })
      .then(response => {
        res.status(200).json(response.data);
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          customRes.TBAerror(res, err.response.status, err.response.data);
        } else {
          customRes.errorUnspecified(res);
        }
      })
      .finally(() => {
        // Log the request
      })
  } else {
    customRes.invalidHeaders(res);
  }
})

module.exports = router;