var mysql = require('mysql');
var keys = require('../key');

// Open connection to the databases 
// MySQL connection details
const matches = mysql.createPool({
  connectionLimit: 12,
  host: 'localhost',
  user: 'admin',
  password: keys.data_pass,
  database: 'skunk',
});

module.exports = matches;