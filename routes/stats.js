// This router is for serving up statistical info
const express = require('express');
const {
  jstat
} = require('jstat');
const utils = require('../lib/utils');
const {
  Worker
} = require('worker_threads');
const customRes = require('../lib/customResponses');
const matchDB = require('../lib/matchesDB');

const router = express.Router();

// get team averages for the whole event
router.get('/event/averages', (req, res) => {
  if (req.header('x-stats-event-code')) {
    matchDB.query(`SELECT * FROM matches2020 WHERE eventName = '${utils.escape()}'`, (err, result) => {

    })
    const worker = new Worker('../lib/worker.js', {
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
  } else {
    customRes.invalidHeaders();
  }
})

// Get shooting data for 3 robots
router.get('/shooting/alliance', (req, res) => {

})

// Get shooting data on 1 robot
router.get('/shooting/robot', (req, res) => {

})

module.exports = router;