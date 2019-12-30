#!/usr/bin/env node
 // #!/home/ubuntu/.nvm/versions/node/v12.13.0/bin/node

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
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
// user middleware
var usersMiddleware = require('./lib/userMiddleware');
// compression 
var compression = require('compression');

// routes
var usersRouter = require('./routes/users');
var statsRouter = require('./routes/stats');
var scoutingRouter = require('./routes/scouting');

const port = process.env.PORT || 1983;
var app = express();

app.use(logger('dev'));
app.use(compression());
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

// recieve pit scouting data
app.post('/pit/upload', usersMiddleware.protectedRoute, (req, res) => {

})

// recieve pit scouting images
// add multer
app.post('/pit/upload/images', usersMiddleware.protectedRoute, (req, res) => {

})

app.listen(port, () => {
  console.log(`Skunk-Stats running on port ${port}.`)
});