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
  let autoLowShots = 0,
    autoOuterShots = 0,
    autoInnerShots = 0,
    autoTotal = 0,
    teleLowShots = 0,
    teleOuterShots = 0,
    teleInnerShots = 0,
    teleTotal = 0,
    totalPosition = 0,
    totalRotation = 0,
    totalPark = 0,
    totalHang = 0,
    totalBuddyHang = 0,
    totalStuckBall = 0,
    totalCrossLine = 0,
    totalDead = 0,
    totalNoShow = 0;
  dataset.forEach(e => {
    autoLowShots += e.auto_low_goal;
    autoOuterShots += e.auto_outer_goal;
    autoInnerShots += e.auto_inner_goal;
    autoTotal += e.auto_total;
    teleLowShots += e.tele_low_goal;
    teleOuterShots += e.tele_outer_goal;
    teleInnerShots += e.tele_inner_goal;
    teleTotal += e.auto_total;
    totalRotation += e.tele_rotation;
    totalPosition += e.tele_position;
    totalPark += e.end_park;
    totalHang += e.end_hang;
    totalBuddyHang += e.end_buddy_hang;
    totalStuckBall += e.stuckBall;
    totalDead += e.deadBot;
    totalNoShow += e.noShow;
  });
  let autoTotalScored = autoInnerShots + autoOuterShots + autoLowShots;
  let teleTotalScored = teleInnerShots + teleOuterShots + teleLowShots;
  return {
    autoLowShots,
    autoOuterShots,
    autoInnerShots,
    autoTotal,
    autoTotalScored,
    avgAutoLow: autoLowShots / dataset.length,
    propAutoLow: autoLowShots / autoTotalScored,
    avgAutoOuter: autoOuterShots / dataset.length,
    propAutoOuter: autoOuterShots / autoTotalScored,
    avgAutoInner: autoInnerShots / dataset.length,
    propAutoInner: autoInnerShots / autoTotalScored,
    avgAutoHit: autoTotalScored / autoTotal,
    teleLowShots,
    teleOuterShots,
    teleInnerShots,
    teleTotal,
    teleTotalScored,
    avgTeleLow: teleLowShots / dataset.length,
    propTeleLow: teleLowShots / teleTotalScored,
    avgTeleOuter: teleOuterShots / dataset.length,
    propTeleOuter: teleOuterShots / teleTotalScored,
    avgTeleInner: teleInnerShots / dataset.length,
    propTeleInner: teleInnerShots / teleTotalScored,
    avgTeleHit: teleTotalScored / teleTotal,
    avgPosition: totalPosition / dataset.length,
    avgRotation: totalRotation / dataset.length,
    avgPark: totalPark / dataset.length,
    avgHang: totalHang / dataset.length,
    avgBuddyHang: totalBuddyHang / dataset.length,
    avgStuckBall: totalStuckBall / dataset.length,
    avgCrossLine: totalCrossLine / dataset.length
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