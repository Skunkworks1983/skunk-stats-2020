var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var keys = require('../key');
var router = express.Router();

router.use(cors());

// MySQL connection details
const matches = mysql.createPool({
  connectionLimit: 6,
  host: 'localhost',
  user: 'admin',
  password: keys.data_pass,
  database: 'skunk',
});

// get data submitted from scouting app
router.put('/data', bodyParser.json(), (req, res) => {

})

// custom match schedule
router.get('/schedule', (req, res) => {

})

// TBA request redirect
// Security flaw while cors is enabled /shrug 
router.get('/tba', cors(), (req, res) => {

})

module.exports = router;