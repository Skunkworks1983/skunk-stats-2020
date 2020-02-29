const {
  jStat
} = require('jstat');

// flatten JSON objects
exports.flatten = (data) => {
  var result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop ? prop + "_" + i : "" + i);
      if (l == 0)
        result[prop] = new Array;
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "_" + p : p);
      }
      if (isEmpty)
        result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
}

exports.hitPercentage = shots => {
  return (((shots.lowerBalls + shots.outerBalls + shots.innerBalls) / shots.totalBalls) * 100)
}

exports.sumShots = obj => {
  let total = 0;
  let inner = 0;
  let outer = 0;
  let lower = 0;
  for (let i of obj) {
    total += i.totalBalls;
    inner += i.innerBalls;
    outer += i.outerBalls;
    lower += i.lowerBalls;
  }
  return {
    total,
    inner,
    outer,
    lower
  }
}

exports.resolveJPGExtension = extension => {
  switch (extension) {
    case 'jpg':
    case 'jpeg':
    case 'jpe':
    case 'jif':
    case 'jfif':
    case 'jfi':
    case 'JPG':
    case 'JPEG':
    case 'JPE':
    case 'JIF':
    case 'JFIF':
    case 'JFI':
      return 'jpg'
    case 'png':
    case 'PNG':
      return 'png'
    default:
      return `${extension}.invalid`
  }
}

// Escape SQL injection like PHP
exports.escape = (str) => {
  if (typeof str === 'string') {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
        case "\0":
          return "\\0";
        case "\x08":
          return "\\b";
        case "\x09":
          return "\\t";
        case "\x1a":
          return "\\z";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "\"":
        case "'":
        case "\\":
        case "%":
          return "\\" + char; // prepends a backslash to backslash, percent,
          // and double/single quotes
      }
    });
  } else {
    return str
  }
}

exports.keyGenerator = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// averages objects in the dataset
exports.average = dataset => {
  let autoLowShots = new Array,
    autoOuterShots = new Array,
    autoInnerShots = new Array,
    autoTotal = new Array,
    teleLowShots = new Array,
    teleOuterShots = new Array,
    teleInnerShots = new Array,
    teleTotal = new Array,
    totalPosition = new Array,
    totalRotation = new Array,
    totalPark = new Array,
    totalHang = new Array,
    totalBuddyHang = new Array,
    totalStuckBall = new Array,
    totalCrossLine = new Array,
    totalDead = new Array,
    totalNoShow = new Array;
  dataset.forEach(e => {
    autoLowShots.push(e.auto_low_goal);
    autoOuterShots.push(e.auto_outer_goal);
    autoInnerShots.push(e.auto_inner_goal);
    autoTotal.push(e.auto_total);
    teleLowShots.push(e.tele_low_goal);
    teleOuterShots.push(e.tele_outer_goal);
    teleInnerShots.push(e.tele_inner_goal);
    teleTotal.push(e.auto_total);
    totalRotation.push(e.tele_rotation);
    totalPosition.push(e.tele_position);
    totalPark.push(e.end_park);
    totalHang.push(e.end_hang);
    totalBuddyHang.push(e.end_buddy_hang);
    totalStuckBall.push(e.stuckBall);
    totalCrossLine.push(e.auto_crossline);
    totalDead.push(e.deadBot);
    totalNoShow.push(e.noShow);
  });
  let autoTotalScored = jStat.sum(autoInnerShots) + jStat.sum(autoOuterShots) + jStat.sum(autoLowShots);
  let teleTotalScored = jStat.sum(teleInnerShots) + jStat.sum(teleOuterShots) + jStat.sum(teleLowShots);
  return {
    autoLowShots: jStat.sum(autoLowShots),
    autoOuterShots: jStat.sum(autoOuterShots),
    autoInnerShots: jStat.sum(autoInnerShots),
    autoTotal: jStat.sum(autoTotal),
    autoTotalScored,
    avgAutoLow: jStat.mean(autoLowShots),
    propAutoLow: jStat.sum(autoLowShots) / autoTotalScored,
    avgAutoOuter: jStat.mean(autoOuterShots),
    propAutoOuter: jStat.sum(autoOuterShots) / autoTotalScored,
    avgAutoInner: jStat.mean(autoInnerShots),
    propAutoInner: jStat.sum(autoInnerShots) / autoTotalScored,
    avgAutoHit: autoTotalScored / jStat.sum(autoTotal),
    teleLowShots: jStat.sum(teleLowShots),
    teleOuterShots: jStat.sum(teleOuterShots),
    teleInnerShots: jStat.sum(teleInnerShots),
    teleTotal: jStat.sum(teleTotal),
    teleTotalScored,
    avgTeleLow: jStat.mean(teleLowShots),
    propTeleLow: jStat.sum(teleLowShots) / teleTotalScored,
    avgTeleOuter: jStat.mean(teleOuterShots),
    propTeleOuter: jStat.sum(teleOuterShots) / teleTotalScored,
    avgTeleInner: jStat.mean(teleInnerShots),
    propTeleInner: jStat.sum(teleInnerShots) / teleTotalScored,
    avgTeleHit: teleTotalScored / jStat.sum(teleTotal),
    avgPosition: jStat.mean(totalPosition),
    avgRotation: jStat.mean(totalRotation),
    avgPark: jStat.mean(totalPark),
    avgHang: jStat.mean(totalHang),
    avgBuddyHang: jStat.mean(totalBuddyHang),
    avgStuckBall: jStat.mean(totalStuckBall),
    avgCrossLine: jStat.mean(totalCrossLine)
  }
}

exports.eventAveragesChart = (dataset, teams) => {
  let teamData = {
    auto_crossline: new Array(teams.length).fill(0),
    auto_low_goal: new Array(teams.length).fill(0),
    auto_outer_goal: new Array(teams.length).fill(0),
    auto_inner_goal: new Array(teams.length).fill(0),
    tele_low_goal: new Array(teams.length).fill(0),
    tele_outer_goal: new Array(teams.length).fill(0),
    tele_inner_goal: new Array(teams.length).fill(0),
    tele_rotation: new Array(teams.length).fill(0),
    tele_position: new Array(teams.length).fill(0),
    end_park: new Array(teams.length).fill(0),
    end_hang: new Array(teams.length).fill(0),
    end_buddy_hang: new Array(teams.length).fill(0)
  }
  for (let i = 0; i < teams.length; i++) {
    let currentData = dataset.filter(e => e.team === teams[i]);
    for (let j of currentData) {
      for (let k in teamData) {
        teamData[k][i] += j[k]
      }
    }
    for (let j in teamData) {
      if (currentData.length) {
        teamData[j][i] = teamData[j][i] / currentData.length
      }
    }
  }
  return teamData
}

exports.rainbow = (numOfSteps, step) => {
  var r, g, b;
  var h = step / numOfSteps;
  var i = ~~(h * 6);
  var f = h * 6 - i;
  var q = 1 - f;
  switch (i % 6) {
    case 0:
      r = 1;
      g = f;
      b = 0;
      break;
    case 1:
      r = q;
      g = 1;
      b = 0;
      break;
    case 2:
      r = 0;
      g = 1;
      b = f;
      break;
    case 3:
      r = 0;
      g = q;
      b = 1;
      break;
    case 4:
      r = f;
      g = 0;
      b = 1;
      break;
    case 5:
      r = 1;
      g = 0;
      b = q;
      break;
  }
  var c = "#" + ("00" + (~~(r * 255)).toString(16)).slice(-2) + ("00" + (~~(g * 255)).toString(16)).slice(-2) + ("00" + (~~(b * 255)).toString(16)).slice(-2);
  return (c);
}

exports.getRandomInt = (min, max) => {
  return Math.round(Math.random() * Math.floor(max - min) + min);
}

exports.hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

exports.pSBC = (p, c0, c1, l) => {
  let r, g, b, P, f, t, h, i = parseInt,
    m = Math.round,
    a = typeof (c1) == "string";
  if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
  if (!this.pSBCr) this.pSBCr = (d) => {
    let n = d.length,
      x = {};
    if (n > 9) {
      [r, g, b, a] = d = d.split(","), n = d.length;
      if (n < 3 || n > 4) return null;
      x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
    } else {
      if (n == 8 || n == 6 || n < 4) return null;
      if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
      d = i(d.slice(1), 16);
      if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
      else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
    }
    return x
  };
  h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = this.pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? this.pSBCr(c1) : P ? {
    r: 0,
    g: 0,
    b: 0,
    a: -1
  } : {
    r: 255,
    g: 255,
    b: 255,
    a: -1
  }, p = P ? p * -1 : p, P = 1 - p;
  if (!f || !t) return null;
  if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
  else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
  a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
  if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
  else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}

exports.handleDigits = num => {
  let team = parseInt(num);
  if (team < 10) {
    return ('000' + team)
  } else if (team < 100) {
    return ('00' + team)
  } else if (team < 1000) {
    return ('0' + team)
  } else {
    return team.toString()
  }
}

exports.scores = dataset => {
  let sum, scores = new Array;
  dataset.forEach(e => {
    sum = 0;
    for (let i in e) {
      switch (i) {
        case 'auto_crossline':
          sum += e[i] * 5
          break;
        case 'auto_low_goal':
          sum += e[i] * 2
          break;
        case 'auto_outer_goal':
          sum += e[i] * 4
          break;
        case 'auto_inner_goal':
          sum += e[i] * 6
          break;
        case 'tele_low_goal':
          sum += e[i]
          break;
        case 'tele_outer_goal':
          sum += e[i] * 2
          break;
        case 'tele_inner_goal':
          sum += e[i] * 3
          break;
        case 'tele_rotation':
          sum += e[i] * 10
          break;
        case 'tele_position':
          sum += e[i] * 20
          break;
        case 'end_park':
          sum += e[i] * 5
          break;
        case 'end_hang':
          sum += e[i] * 25
          break;
        case 'end_buddy_hang':
          sum += e[i] * 50
          break;
      }
    }
    scores.push(sum)
  })
  scores.sort((a, b) => a - b);
  return scores
}

exports.standardDeviation = dataset => {
  let scores = this.scores(dataset);
  let avg = jStat.mean(scores),
    std = jStat.stdev(scores, true);
  scores.filter((e, i) => scores.indexOf(e) === i)
  let dist = new Array;
  let cumulative = new Array;
  scores.forEach(e => {
    dist.push(jStat.normal.pdf(e, avg, std));
    cumulative.push(jStat.normal.cdf(e, avg, std));
  })
  return {
    std,
    avg,
    dist,
    cumulative,
    scores
  }
}

exports.generateGaussianCurve = data => {
  let points = new Array;
  for (let i = 0; i <= 300; i++) {
    points.push({
      x: i,
      y: jStat.normal.pdf(i, data.avg, data.std)
    })
  }
  return points
}

exports.getAllianceData = (db, teams) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM matches2020 WHERE team IN(${teams.toString()});`, (err, res) => {
      if (err) {
        reject(err)
        throw err
      } else {
        resolve(res)
      }
    })
  })
}

exports.getStrictAllianceData = (db, teams, event) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM matches2020 WHERE team IN(${teams.toString()}) AND eventName = '${this.escape(event)}';`, (err, res) => {
      if (err) {
        reject(err)
        throw err
      } else {
        resolve(res)
      }
    })
  })
}