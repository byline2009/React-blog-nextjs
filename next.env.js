/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const dotenv = require("dotenv");
// const dotenvExpand = require('dotenv-expand')

const { NODE_ENV } = process.env;
const ENV = process.env.ENV || "dev";
const dotenvFiles = [`.env.${ENV}`];
let envData = {};
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    const dotenvData = dotenv.config({
      path: dotenvFile,
    }).parsed;
    envData = { ...dotenvData, ...envData };
    // dotenvExpand(dotenvData)
  }
});

/* eslint-disable */
console.log("___________");
console.log("NODE_ENV: ", NODE_ENV);
console.log("ENV: ", ENV);
console.log("envData: ", envData);
console.log("___________");
/* eslint-enable */

module.exports = envData;
