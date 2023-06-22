const { Router } = require("express");
const User = require("../models/User");

const router = Router();

router.get("/", async (request, response) => {
  const { username } = request.session.user;
  const users = await User.find({ username: { $ne: username } }).select([
    "_id",
    "email",
    "username",
    "avatarImage",
    "fullname",
  ]);

  response.json(users);
});

router.get("/me", async (request, response) => {
  response.json(request.session.user);
});

module.exports = router;
