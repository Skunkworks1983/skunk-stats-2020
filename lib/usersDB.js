var mysql = require('mysql');
var keys = require('../key');

// Open connection to the databases 
// MySQL connection details
const users = mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'admin',
  password: keys.data_pass,
  database: 'users',
});

module.exports = users;