//@ts-check
const { Router } = require("express");
const { getViews } = require("../lib/utils");

const User = require("../models/User");
const bcrypt = require("bcrypt");

const multer = require("multer");
const upload = multer();

const router = Router();

const loginFile = getViews("login", "index.html");

router.get("/", async (_request, response) => {
  response.sendFile(loginFile);
});

router.post("/", upload.none(), async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  if (!user) {
    return response.status(400).json({
      msg: "Incorrect username or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, /** @type {string} */ (user.password));
  if (!isPasswordValid) {
    return response.status(400).json({
      msg: "Incorrect username or password",
    });
  }

  response.status(302).json({
    url: `/`,
  });
});

module.exports = router;
