// This router is for serving up statistical info
var express = require('express');
var jstat = require('jstat').jStat;
var mysql = require('mysql');
var Worker = require('tiny-worker');
var keys = require('../key');
var customRes = require('../lib/customResponses');
var router = express.Router();

// MySQL connection
const matches = mysql.createPool({
  connectionLimit: 6,
  host: 'localhost',
  user: 'admin',
  password: keys.data_pass,
  database: 'skunk',
});

module.exports = router;