// @ts-check
require("express-async-error");
const errorHandler = require("./middlewares/error-handler");

const express = require("express");
const cookieParse = require("cookie-parser");

const app = express();

app.use(cookieParse());
app.use("/", express.static(`${process.cwd()}/public`));

const loginRouter = require("./routers/login");
app.use("/login", loginRouter);

const registerRouter = require("./routers/register");
app.use("/register", registerRouter);

app.use(errorHandler);

module.exports = app;
