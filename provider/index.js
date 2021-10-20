const walk = require("./walk");
const path = require("path");
const fs = require("fs");

let configs = {};
const defaultPath = path.join(process.cwd(), "config");

function loadFilesFromPath(cfgPath) {
  if (!fs.existsSync(cfgPath)) {
    return;
  }

  configs = walk(cfgPath)
    .map((filePath) => {
      const name = filePath
        .replace(/(.+[\\\/])*/g, "")
        .replace(/\.js$|\.json$/, "");
      return { [name]: require(filePath) };
    })
    .reduce((output, obj) => {
      const k = Object.keys(obj)[0];
      return Object.assign({}, output, { [k]: obj[k] });
    }, {});
}

function filterEnvSensitiveConfigs() {
  const env = process.env.NODE_ENV;
  Object.keys(configs).forEach((key) => {
    if (configs[key][env]) {
      configs[key] = configs[key][env];
    }
  });
}

module.exports = {
  load(userPath = null) {
    configs = {};
    const cfgPath = userPath || defaultPath;

    loadFilesFromPath(cfgPath);
    filterEnvSensitiveConfigs();
  },
  get(key) {
    return key
      .split(".")
      .reduce((prev, curr) => (prev ? prev[curr] : undefined), configs);
  },
};

module.exports.load();
