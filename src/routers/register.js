//@ts-check
const { Router } = require("express");
const { getView } = require("../lib/utils");

const User = require("../models/User");
const bcrypt = require("bcrypt");

const multer = require("multer");
const upload = multer();

const router = Router();

const registerFile = getView("register");

router.get("/", async (_request, response) => {
  response.sendFile(registerFile);
});

router.post("/", upload.none(), async (request, response) => {
  const { username, email, password, passwordConfirm } = request.body;

  const usernameCheck = await User.findOne({ username });
  if (usernameCheck) {
    return response.status(400).json({
      error: "username",
      msg: "Username already used",
    });
  }

  const emailCheck = await User.findOne({ email });
  if (emailCheck) {
    return response.status(400).json({
      error: "email",
      msg: "Email already used",
    });
  }

  if (password !== passwordConfirm) {
    return response.status(400).json({
      error: "password",
      msg: "Password does not match",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 3);
  await User.create({ username, email, password: hashedPassword });

  response.status(302).json({
    url: "/login",
  });
});

module.exports = router;
