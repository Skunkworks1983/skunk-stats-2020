var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var keys = require('../key');
var customRes = require('../lib/customResponses');
var utils = require('../lib/utils');
// remove this dependency in production
var cors = require('cors');
var router = express.Router();

router.use(cors());

const users = mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'admin',
  password: keys.data_pass,
  database: 'users',
});

router.post('/register', bodyParser.json(), (req, res) => {
  if (req.body.code === keys.reg_code) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        console.warn(err);
      } else {
        users.query(`INSERT INTO users2020 VALUES ('${utils.escape(req.body.name)}', ${utils.escape(req.body.team)}, '${utils.escape(req.body.email)}', '${utils.escape(req.body.username)}', '${hash}');`, (err, result) => {
          if (err && err.errno === 1062) {
            customRes.duplicateRegistration(res);
          } else if (err) {
            console.warn(err)
            customRes.registrationError(res);
          } else {
            customRes.registrationSuccess(res);
          }
        })
      }
    })
  } else {
    customRes.registrationCodeError(res);
  }
})

module.exports = router;