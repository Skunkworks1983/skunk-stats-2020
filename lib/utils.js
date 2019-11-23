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
        result[prop] = [];
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

exports.resolveJPGExtension = (extension) => {
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

// API key validation down the line
// or password hash salting
exports.keyGenerator = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}