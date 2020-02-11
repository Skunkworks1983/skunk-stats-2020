// This router is for serving up statistical info
const express = require('express');
const utils = require('../lib/utils');
const usersMiddleware = require('../lib/userMiddleware');
const customRes = require('../lib/customResponses');
const matchesDB = require('../lib/matchesDB');
const axios = require('axios');
const keys = require('../key');
const {
  jStat
} = require('jstat')

var router = express.Router();

// get pit data
router.get('/pit', usersMiddleware.protectedRoute, (req, res) => {
  if (req.header('x-stats-team')) {
    matchesDB.query(`SELECT * FROM RobotProfiles2020 WHERE team=${utils.escape(req.header('x-stats-team'))};`, (err, result) => {
      if (err) {
        console.warn(err);
        return customRes.serverError(res);
        // } else if (result.length < 1) {
        //   return customRes.notFound(res);
      } else {
        res.status(200).json(result);
      }
    })
  } else {
    return customRes.invalidHeaders(res);
  }
})

// get team averages for the whole event for stack chart
router.get('/:event/averages', usersMiddleware.protectedRoute, (req, res) => {
  matchesDB.query(`SELECT * FROM matches2020 WHERE eventName = '${utils.escape(req.params.event)}'`, (err, result) => {
    if (err) {
      console.error(err);
      return customRes.serverError(res)
    } else if (result.length > 0) {
      res.json(utils.eventAveragesChart(result))
    } else {
      return customRes.notFound(res)
    }
  })
})

router.get('/:event/averages/all', usersMiddleware.protectedRoute, (req, res) => {
  axios({
      method: 'GET',
      url: `https://www.thebluealliance.com/api/v3/event/${req.params.event}/teams/simple`,
      headers: {
        'X-TBA-Auth-Key': keys.TBA_key,
        'User-Agent': 'Skunk-Stats'
      }
    })
    .then(response => {
      let teams = new Array;
      response.data.forEach(e => teams.unshift(e.team_number));
      teams.sort((a, b) => a - b);
      matchesDB.query(`SELECT * FROM matches2020 WHERE team IN(${teams.toString()});`, (err, result) => {
        if (err) {
          console.error(err);
          return customRes.serverError(res)
        } else if (result.length > 0 && teams.length > 0) {
          let chartData = utils.eventAveragesChart(result, teams);
          res.status(200).json({
            labels: teams,
            datasets: [{
                label: 'Auto Cross Line',
                backgroundColor: utils.rainbow(12, 1),
                data: chartData.auto_crossline.map(e => e * 5)
              },
              {
                label: 'Auto Lower Cells',
                backgroundColor: utils.rainbow(12, 2),
                data: chartData.auto_low_goal.map(e => e * 2)
              },
              {
                label: 'Auto Outer Cells',
                backgroundColor: utils.rainbow(12, 3),
                data: chartData.auto_outer_goal.map(e => e * 4)
              },
              {
                label: 'Auto Inner Cells',
                backgroundColor: utils.rainbow(12, 4),
                data: chartData.auto_inner_goal.map(e => e * 6)
              },
              {
                label: 'Tele Lower Cells',
                backgroundColor: utils.rainbow(12, 5),
                data: chartData.tele_low_goal.map(e => e * 1)
              },
              {
                label: 'Tele Outer Cells',
                backgroundColor: utils.rainbow(12, 6),
                data: chartData.tele_outer_goal.map(e => e * 2)
              },
              {
                label: 'Tele Inner Cells',
                backgroundColor: utils.rainbow(12, 7),
                data: chartData.tele_inner_goal.map(e => e * 3)
              },
              {
                label: 'Rotation Control',
                backgroundColor: utils.rainbow(12, 8),
                data: chartData.tele_rotation.map(e => e * 10)
              },
              {
                label: 'Position Control',
                backgroundColor: utils.rainbow(12, 9),
                data: chartData.tele_position.map(e => e * 20)
              },
              {
                label: 'Park',
                backgroundColor: utils.rainbow(12, 10),
                data: chartData.end_park.map(e => e * 5)
              },
              {
                label: 'Hang',
                backgroundColor: utils.rainbow(12, 11),
                data: chartData.end_hang.map(e => e * 25)
              },
              {
                label: 'Buddy Hang',
                backgroundColor: utils.rainbow(12, 12),
                data: chartData.end_buddy_hang.map(e => e * 50)
              }
            ]
          })
        } else {
          res.status(206).json({
            labels: teams,
            datasets: new Array
          })
        }
      })
    })
    .catch(err => {
      if (err.response.status === 404) {
        return customRes.notFound(res)
      } else {
        console.log(err);
        return customRes.errorUnspecified(res);
      }
    })
})

router.get('/:team', usersMiddleware.protectedRoute, (req, res) => {
  matchesDB.query(`SELECT * FROM matches2020 WHERE team = ${utils.escape(req.params.team)};`, (err, result) => {
    if (err) {
      console.error(err);
      return customRes.serverError(res);
    } else if (result.length > 0) {
      let stdDev = utils.standardDeviation(result);
      res.json({
        raw: result,
        stats: utils.average(result),
        std: stdDev.std,
        avg: stdDev.avg,
        cumulative: stdDev.cumulative,
        dist: stdDev.dist,
        scores: stdDev.scores,
        boxPlot: stdDev.scores
      })
    } else {
      return customRes.notFound(res)
    }
  })
})

// get accuracy data on a team
router.get('/:team/accuracy', usersMiddleware.protectedRoute, (req, res) => {

})

// Get shooting data for 3 robots
router.get('/shooting/alliance', usersMiddleware.protectedRoute, (req, res) => {
  if (req.header('x-stats-teams')) {
    matchesDB.query(`SELECT * FROM shootingData WHERE team IN(${utils.escape(req.header('x-stats-teams').split(', ').toString())});`, (err, result) => {
      if (err) {
        console.error(err);
        return customRes.serverError(res);
      } else {
        res.status(200).json(result);
      }
    })
  } else {
    return customRes.invalidHeaders(res);
  }
})

// Get shooting data on 1 robot
router.get('/shooting/robot', usersMiddleware.protectedRoute, (req, res) => {
  if (req.header('x-stats-team')) {
    matchesDB.query(`SELECT * FROM shootingData WHERE team='${utils.escape(req.header('x-stats-team'))}';`, (err, result) => {
      if (err) {
        console.error(err);
        return customRes.serverError(res);
      } else {
        res.status(200).json(result);
      }
    })
  } else {
    return customRes.invalidHeaders(res);
  }
})

module.exports = router;