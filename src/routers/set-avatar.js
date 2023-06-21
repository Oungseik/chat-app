// @ts-check
const { Router } = require("express");
const { getView } = require("../lib/utils");

const User = require("../models/User");

const router = Router();

const setAvatarView = getView("set-avatar");

router.get("/", async (_request, response) => {
  response.sendFile(setAvatarView);
});

router.post("/", async (request, response) => {
  if (!request.session.user) {
    return response.redirect("/login");
  }

  const { username } = request.session.user;
  const { avatarImage } = request.body;
  await User.findOneAndUpdate({ username }, { avatarImage, isAvatarImageSet: true });

  request.session.user.avatarImage = avatarImage;
  request.session.user.isAvatarImageSet = true;

  response.redirect("/");
});

module.exports = router;
