const fs = require("fs");
const path = require("path");

function walk(dir) {
  let results = [],
    list = fs.readdirSync(dir);
  list.forEach(function (file) {
    let filePath = path.join(dir, "/", file);
    let stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

exports = walk;
