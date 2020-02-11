#!/home/ubuntu/.nvm/versions/node/v13.6.0/bin/node

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// API keys and MySQL credentials
const keys = require('./key');
// For file system operations
const fs = require('fs');
// body parser
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
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

// Testing purposes
const cors = require('cors');
app.use(cors());

// enable routes
app.use('/users', usersRouter);
app.use('/stats', statsRouter);
app.use('/scouting', scoutingRouter);

// add static file routes here
app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'prototypes', 'map.html'));
})

// recieve pit scouting data
app.post('/pit/upload', usersMiddleware.protectedRoute, (req, res) => {
  matchesDB.query(`INSERT INTO RobotProfiles2020 VALUES (${utils.escape(req.body.team)}, '${utils.escape(req.body.drivetrainType)}', '${utils.escape(req.body.drivetrainMotors)}', ${utils.escape(req.body.cellCount)}, ${utils.escape(req.body.lowerGoal)}, ${utils.escape(req.body.outerGoal)}, ${utils.escape(req.body.innerGoal)}, ${utils.escape(req.body.weight)}, ${utils.escape(req.body.height)}, ${utils.escape(req.body.trench)}, ${utils.escape(req.body.hang)}, ${utils.escape(req.body.position)}, ${utils.escape(req.body.rotation)}, ${utils.escape(req.body.buddyHang)}, '${utils.escape(req.body.notes)}', ${Date.now()});`, (err, result) => {
    if (err) {
      if (err.errno === 1062) {
        customRes.dbDuplicate(res);
      } else {
        customRes.serverError(res);
        return console.warn(err);
      }
    } else {
      customRes.success(res);
    }
  })
})

// recieve pit scouting images
app.post('/pit/upload/images', usersMiddleware.protectedRoute, (req, res) => {
  if (req.header('x-stats-team')) {
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'robots'));
      },
      filename: (req, file, cb) => {
        cb(null, `${utils.handleDigits(parseInt(req.header('x-stats-team')))}.${Date.now()}.${utils.resolveJPGExtension(file.originalname.split('.')[file.originalname.split('.').length - 1])}`)
      }
    });
    let upload = multer({
      storage: storage
    }).array('files', 12);
    upload(req, res, (err) => {
      if (err) {
        return console.error(err)
      } else {
        customRes.success(res);
        customRes.success(res)
      }
    })
  } else {
    customRes.invalidHeaders(res);
  }
})

// must be at the bottom to ensure no endpoints are missed
app.use(history({
  index: '/'
}));

module.exports = app;

// Send SPA
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Skunk-Stats running on port ${port}.`)
});