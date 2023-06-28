//@ts-check
const { Router } = require("express");
const { getView } = require("../lib/utils");

const User = require("../models/User");
const bcrypt = require("bcrypt");

const multer = require("multer");
const { log } = require("../lib/logger");
const upload = multer();

const router = Router();

const loginView = getView("login");

router.get("/", async (_request, response) => {
  response.sendFile(loginView);
});

router.post("/", upload.none(), async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  if (!user) {
    return response.status(400).json({
      msg: "Username does not exist",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, /** @type {string} */ (user.password));
  if (!isPasswordValid) {
    return response.status(400).json({
      msg: "Incorrect username or password",
    });
  }

  request.session.user = {
    username,
    email: user.email,
    id: user._id.toString(),
    isAvatarImageSet: user.isAvatarImageSet,
    avatarImage: user.avatarImage,
  };

  if (!user.isAvatarImageSet) {
    return response.status(302).json({
      url: `/set-avatar`,
    });
  }

  response.status(302).json({
    url: `/`,
  });
});

router.delete("/", async (request, response) => {
  request.session.destroy(() => {
    log("a user is logged out");
  });

  response.redirect("/login");
});

module.exports = router;
