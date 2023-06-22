// @ts-check
require("express-async-error");
const errorHandler = require("./middlewares/error-handler");

const express = require("express");
const cookieParse = require("cookie-parser");

const app = express();
const ONE_DAY = 1000 * 60 * 60 * 24;

const sessions = require("express-session");
app.use(
  sessions({
    secret: /** @type {string} */ (process.env.SESSION_SECRET),
    cookie: { maxAge: ONE_DAY },
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

app.use("/", express.static(`${process.cwd()}/public`));

const loginRouter = require("./routers/login");
app.use("/login", loginRouter);

const registerRouter = require("./routers/register");
app.use("/register", registerRouter);

app.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});

const chatsRouter = require("./routers/chats");
app.use("/", chatsRouter);

const setAvatarRouter = require("./routers/set-avatar");
app.use("/set-avatar", setAvatarRouter);

// api routes
const usersApiRouter = require("./api/users");
app.use("/api/users", usersApiRouter);

app.use(errorHandler);

module.exports = app;
