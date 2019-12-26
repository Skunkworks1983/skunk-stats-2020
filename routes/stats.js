// This router is for serving up statistical info
var express = require('express');
var jstat = require('jstat').jStat;
var Worker = require('tiny-worker');
var customRes = require('../lib/customResponses');
var matchDB = require('../lib/matchesDB');

var router = express.Router();

// get team averages for the whole event
router.get('/event/averages', (req, res) => {
  if (req.header('x-stats-event-code')) {
    // calculate by passing to a worker
  } else {
    customRes.invalidHeaders();
  }
})

module.exports = router;