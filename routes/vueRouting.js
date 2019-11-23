var express = require('express');
// Support Vue History Mode
var history = require('connect-history-api-fallback');
var customRes = require('../lib/customResponses');
var glob = require('glob');
var router = express.Router();

router.use(history());

// Send SPA
router.get('/', (req, res, next) => {
  res.sendFile(`${__dirname}client/dist/index.html`);
});

// Send urls to the images
router.get('/robot', (req, res) => {
  team = req.header('team');
  // Find all files matching the glob
  glob(`${__dirname}public/robots/${team}*.jpg`, options, (err, files) => {
    if (err) {
      console.warn(err);
    } else {
      if (files.toString !== '[]') {
        absPaths = [];
        files.forEach(element => absPaths.push(`${customRes.path}/robots/${element}`));
        res.send(JSON.stringify(absPaths));
      } else {
        res.send(JSON.stringify([`${customRes.path}/robots/default.jpg`]));
      }
    }
  })
})

module.exports = router;