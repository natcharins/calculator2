/// <reference path="./src/index.ts" />
/// <reference path="./webpack/webpack.common.js" />

function getConfigPath() {
    return "./config/" + String(process.env.NODE_ENV)+ "/app.config.json";
}

function getWebConfigPath() {
    return "../config/"
        + (((process.env.NODE_ENV || "local").indexOf("local") > -1) ? "local" : String(process.env.NODE_ENV))
        + "/app.config.json";
}

exports.getConfigPath = getConfigPath();
exports.getWebConfigPath = getWebConfigPath();