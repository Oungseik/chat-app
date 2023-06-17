// @ts-check
const express = require("express");
const { log } = require("./logger");

const app = express();
app.use("/", express.static(`${process.cwd()}/dist`));

module.exports = app;
