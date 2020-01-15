#!/home/ubuntu/.nvm/versions/node/v12.13.0/bin/node

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// API keys and MySQL credentials
const keys = require('./key');
// For file system operations
const fs = require('fs');
// grab custom util functions
const utils = require('./lib/utils');
// grab custom responses
const customRes = require('./lib/customResponses');
// security
const helmet = require('helmet');
// rate limiter
const rateLimit = require('./lib/rateLimit');
// multer for form data
const multer = require('multer');
// databases
const usersDB = require('./lib/usersDB');
const matchesDB = require('./lib/matchesDB');
// api fallback
const history = require('connect-history-api-fallback');
// user middleware
const usersMiddleware = require('./lib/userMiddleware');
// compression 
const compression = require('compression');

// routes
const usersRouter = require('./routes/users');
const statsRouter = require('./routes/stats');
const scoutingRouter = require('./routes/scouting');

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
// Allow serving of prototypes
app.use(express.static(path.join(__dirname, 'prototypes')));
app.use(helmet());
app.disable('x-powered-by');
app.use(rateLimit);

// enable routes
app.use('/users', usersRouter);
app.use('/stats', statsRouter);
app.use('/scouting', scoutingRouter);

app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'prototypes', 'map.html'));
})

// must be at the bottom to ensure no endpoints are missed
app.use(history({
  index: '/'
}));

module.exports = app;

let robotUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/public/robots`)
  },
  filename: (req, file, cb) => {
    cb(null, `${__dirname}/`)
  }
})

// Send SPA
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// recieve pit scouting data
app.post('/pit/upload', usersMiddleware.protectedRoute, (req, res) => {

})

// recieve pit scouting images
// add multer
app.post('/pit/upload/images', usersMiddleware.protectedRoute, (req, res) => {
  if (req.header('x-stats-team')) {
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/robots`)
      },
      filename: (req, file, cb) => {
        cb(null, `${req.header('x-stats-team')}-${Date.now()}.${utils.resolveJPGExtension(file.originalname.split('.')[file.originalname.split('.').length -1])}`)
      }
    });
    let upload = multer({
      storage
    }).all();
    upload(req, res, (err) => {
      if (err) {
        return console.error(err)
      } else {
        customRes.success(res);
      }
    })
  } else {
    customRes.invalidHeaders(res);
  }
})

app.listen(port, () => {
  console.log(`Skunk-Stats running on port ${port}.`)
});