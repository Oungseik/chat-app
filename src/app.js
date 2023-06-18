// @ts-check
require("express-async-error");
const errorHandler = require("./middlewares/error-handler");

const express = require("express");
const cookieParse = require("cookie-parser");

const app = express();
app.use("/", express.static(`${process.cwd()}/dist`));
app.use(cookieParse());

app.use(errorHandler);

module.exports = app;
