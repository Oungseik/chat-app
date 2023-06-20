const { Router } = require("express");
const { getView } = require("../lib/utils");

// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// const multer = require("multer");
// const upload = multer();

const router = Router();

const setAvatarView = getView("set-avatar");

router.get("/", async (request, response) => {
  console.log(request.session.user);

  response.sendFile(setAvatarView);
});

module.exports = router;
