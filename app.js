#!/usr/bin/env node
 // #!/home/ubuntu/.nvm/versions/node/v12.13.0/bin/node

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var bodyParser = require('body-parser');
// Password auth
var passport = require('passport');
var Strategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var jwtTokens = require('jsonwebtoken');
// Password hashing
var bcrypt = require('bcrypt');
// API keys and MySQL credentials
var keys = require('./key');
// For file system operations
var fs = require('fs');
// grab custom util functions
var utils = require('./lib/utils');
// grab custom responses
var customRes = require('./lib/customResponses');
// security
var helmet = require('helmet');
// http requests
var axios = require('axios');
// rate limiter
var rateLimit = require('./lib/rateLimit');
// multer for form data
var multer = require('multer');
// databases
var usersDB = require('./lib/usersDB');
var matchesDB = require('./lib/matchesDB');
// api fallback
var history = require('connect-history-api-fallback');

// routes
var usersRouter = require('./routes/users');
var statsRouter = require('./routes/stats');
var scoutingRouter = require('./routes/scouting');

const port = process.env.PORT || 1983;
var app = express();

passport.use(new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt_secret
}, (payload, next) => {
  usersDB.query(`SELECT * FROM users2020 WHERE username = '${utils.escape(payload.username)}';`, (err, result) => {
    if (err) {
      console.warn(err);
      next(null, null)
    } else if (result.length !== 0) {
      // either no username or password
      next(null, null)
    } else {
      // there is the username, check if password matches
      bcrypt.compare(password, result, (err, res) => {
        if (err) {
          console.warn(err)
        } else {
          next(null, res)
        }
      })
    }
  })
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
// Allow serving of client
app.use(express.static(path.join(__dirname, 'client', 'dist')));
// Allow serving of images
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.disable('x-powered-by');
app.use(rateLimit);

// Initialize Passport and restore authentication state, if any, from the session.
// Pass it as middleware with passport.authenticate('jwt', { failureRedirect: '/login' }),
app.use(passport.initialize());
app.use(passport.session());

// enable routes
app.use('/users', usersRouter);
app.use('/stats', statsRouter);
app.use('/scouting', scoutingRouter);

// must be at the bottom to ensure no endpoints are missed
app.use(history({
  index: '/'
}));

module.exports = app;

// Send SPA
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/client', 'dist', 'index.html'));
});

app.get('/testAuth', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.status(200).send('Authorized')
})

// recieve pit scouting data
// protected endpoint
app.post('/pit', (req, res) => {

})

app.listen(port, () => {
  console.log(`Skunk-Stats running on port ${port}.`)
});