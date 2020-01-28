// This router is for serving up statistical info
const express = require('express');
const utils = require('../lib/utils');
const {
  Worker
} = require('worker_threads');
const customRes = require('../lib/customResponses');
const matchesDB = require('../lib/matchesDB');

const router = express.Router();

// get team averages for the whole event
router.get('/event/averages', (req, res) => {
  if (req.header('x-stats-event-code')) {
    matchesDB.query(`SELECT * FROM matches2020 WHERE eventName = '${utils.escape()}'`, (err, result) => {
      const worker = new Worker('../lib/workers/worker_average.js', {
        event: req.header('x-stats-event-code')
      });
      worker.on('message', () => {
        // TODO
      });
      worker.on('error', () => {
        // TODO
      });
      worker.on('exit', () => {
        // TODO
      });
    })
  } else {
    customRes.invalidHeaders();
  }
})

// Get shooting data for 3 robots
router.get('/shooting/alliance', (req, res) => {
  if (req.header('x-stats-teams')) {

  } else {
    customRes.invalidHeaders(res);
  }
})

// Get shooting data on 1 robot
router.get('/shooting/robot', (req, res) => {
  if (req.header('x-stats-team')) {
    matchesDB.query(`SELECT * FROM matches2020 WHERE team='${utils.escape(req.header('x-stats-team'))}';`, (err, result) => {
      if (err) {
        console.error(err)
      } else {
        res.status(200).json(result);
      }
    })
  } else {
    customRes.invalidHeaders(res);
  }
})

module.exports = router;