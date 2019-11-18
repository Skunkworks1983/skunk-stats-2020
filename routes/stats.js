// This router is for serving up statistical info
var express = require('express');
var sqlite3 = require('sqlite3');
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

// SQLite connection
// const stats = new sqlite3.Database(`${__dirname}/db/stats.db`, (err) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log('Connected to the SQLITE database from stats router.');
//   }
// });


module.exports = router;