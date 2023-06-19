// @ts-check
require("express-async-error");
const errorHandler = require("./middlewares/error-handler");
const registerRouter = require("./routers/register");

const express = require("express");
const cookieParse = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();
app.use("/", express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParse());

app.use("/register", registerRouter);

app.use(errorHandler);

module.exports = app;
