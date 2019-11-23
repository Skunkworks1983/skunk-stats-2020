#!/usr/bin/env node
 // #!/home/ubuntu/.nvm/versions/node/v12.13.0/bin/node

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');
// mysql for logging data
var mysql = require('mysql');
// Password auth
var passport = require('passport');
var Strategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
// Password hashing
var bcrypt = require('bcrypt');
// Support for cross origin requests from scouting app
// var cors = require('cors');
// API keys and MySQL credentials
var keys = require('./key');
// For file system operations
var fs = require('fs');
// For asynchronous processing tasks
var Worker = require("tiny-worker");
// express session 
// var session = require('express-session');
var session = require('cookie-session');
// multer for form data
var multer = require('multer');
// grab custom utils
var utils = require('./lib/utils');
// grab custom responses
var customRes = require('./lib/customResponses');
// security
var helmet = require('helmet');
// http requests
var axios = require('axios');
// rate limiter
var rateLimit = require('./lib/rateLimit');

var usersRouter = require('./routes/users');
var statsRouter = require('./routes/stats');
var scoutingRouter = require('./routes/scouting');
var vueRouter = require('./routes/vueRouting');

const port = process.env.PORT || 3000;
var app = express();

// Open connection to the databases 
// MySQL connection details
const matches = mysql.createPool({
  connectionLimit: 12,
  host: 'localhost',
  user: 'admin',
  password: keys.data_pass,
  database: 'skunk',
});

const users = mysql.createPool({
  connectionLimit: 3,
  host: 'localhost',
  user: 'admin',
  password: keys.data_pass,
  database: 'users',
});

// Open passport strategy
// passport.use(new Strategy({
//     usernameField: 'email',
//     passwordField: 'passwd',
//     session: false
//   },
//   (username, password, cb) => {
//     users.query(`SELECT * FROM users2020 WHERE username = '${utils.escape(username)}';`, (err, result) => {
//       if (err) {
//         console.warn(err);
//         return cb(null, false);
//       } else if (result.toString !== '[]') {
//         // either no username or password
//         return cb(null, false)
//       } else {
//         // there is the username, check if password matches
//         bcrypt.compare(password, result, (err, res) => {
//           if (err) {
//             console.warn(err)
//           } else {
//             return cb(null, res)
//           }
//         })
//       }
//     })
//   }));

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt_secret
}), (payload, next) => {
  // Todo: find user in DB
  next(null, null)
})

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/robots', express.static(path.join(__dirname, 'public', 'robots')));
app.use(helmet());
app.disable('x-powered-by');
app.use(rateLimit);
// app.use(session({
//   name: 'session',
//   secret: 'keyboard skunk',
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true,
//     // domain: '73.109.240.48',
//     maxAge: Math.pow(60, 2) * 10000
//   }
// }));

// Initialize Passport and restore authentication state, if any, from the session.
// Pass it as middleware with passport.authenticate('local', { failureRedirect: '/login' }),
app.use(passport.initialize());
app.use(passport.session());

app.use('/', vueRouter);
app.use('/users', usersRouter);
app.use('/stats', statsRouter);
app.use('/scouting', scoutingRouter);

module.exports = app;

// On first boot:
// If there is no database, create one.
// Calculate ELOs and other standard deviation stats, building the team database.
// Write all generated stats to the sqlite db

// Listen for scouting app PUT uploads
// Write these to the matches table

// Check login credentials
app.post('/login', passport.authenticate('jwt', {
  failureRedirect: '/login'
}), (req, res) => {
  user.query('', (err, result) => {

  })
})

app.get('/testAuth', passport.authenticate('jwt', {
  session: false
}), (req, res) => {

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});