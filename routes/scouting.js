var express = require('express');
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var glob = require('glob');
var customRes = require('../lib/customResponses');
var matchesDB = require('../lib/matchesDB');
var router = express.Router();

router.use(cors());

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

// get data submitted from scouting app
router.put('/data', (req, res) => {
  // TODO: Finish once build season starts
})

// send custom match schedule in case TBA doesn't have one
router.get('/schedule', (req, res) => {
  res.sendFile(`${__dirname}/../public/schedule.json`);
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
        res.status(200).send(response);
      })
      .catch(err => {
        customRes.TBAerror(res, err.response.status, err.response.data);
      })
      .finally(() => {
        // Log the request
      })
  } else {
    customRes.invalidHeaders(res);
  }
})

module.exports = router;