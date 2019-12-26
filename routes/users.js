var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var keys = require('../key');
var customRes = require('../lib/customResponses');
var utils = require('../lib/utils');
var usersDB = require('../lib/usersDB');
var usersMiddleware = require('../lib/userMiddleware');
var logger = require('../lib/logger');
var router = express.Router();

// var cors = require('cors');
// router.use(cors());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));

router.post('/register', usersMiddleware.validateRegister, (req, res) => {
  // check for proper registration code
  if (req.body.code === keys.reg_code) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        console.warn(err);
      } else {
        usersDB.query(`INSERT INTO users2020 VALUES ('${utils.escape(req.body.name)}', ${utils.escape(req.body.team)}, '${utils.escape(req.body.email)}', '${utils.escape(req.body.username)}', '${hash}');`, (err, result) => {
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

// Check login credentials and attach token to response
router.post('/login', (req, res) => {
  if (req.body.username && req.body.password) {
    usersDB.query(`SELECT * FROM users2020 WHERE username = '${utils.escape(req.body.username)}';`, (err, result) => {
      if (err) {
        console.warn(err);
        customRes.errorUnspecified(res);
      } else if (!result.length) {
        customRes.loginNotFound(res);
      } else {
        bcrypt.compare(req.body.password, result[0]['pass'], (encErr, encResult) => {
          if (encErr) {
            console.warn(encErr);
            // TODO log error
            customRes.loginPasswordError(res);
          } else if (encResult) {
            const token = jwt.sign({
              username: result[0].username,
              name: result[0].contactName
            }, keys.jwt_secret, {
              expiresIn: '7d'
            });
            // TODO log the login
            customRes.loginSuccess(res, token, result[0]['contactName']);
          } else {
            console.log('Error in decrypt.');
            customRes.loginPasswordError(res);
          }
        })
      }
    })
  } else {
    customRes.invalidHeaders(res);
  }
})

module.exports = router;