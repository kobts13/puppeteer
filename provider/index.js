const walk = require("./walk");
const path = require("path");
const fs = require("fs");

let configs = {};
const defaultPath = path.join(process.cwd(), "config");
const defaultEnvKey = "defaultEnv_51d5c910_593e_4536_9925_bd092494fef8";
const defaultEnv = "default";

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
    if (configs[key][defaultEnv] && !configs[defaultEnvKey]) {
      configs[defaultEnvKey] = configs[key][defaultEnv];
    }
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
    const value = key
      .split(".")
      .reduce((prev, curr) => (prev ? prev[curr] : undefined), configs);
    if (process.env.NODE_ENV && !value) {
      key = defaultEnvKey + "." + key.split(".").slice(1).join(".");
      return key
        .split(".")
        .reduce((prev, curr) => (prev ? prev[curr] : undefined), configs);
    }
    return value;
  },
};

module.exports.load();
