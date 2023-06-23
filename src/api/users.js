const { Router } = require("express");
const User = require("../models/User");

const router = Router();

router.get("/", async (request, response) => {
  const { username } = request.session.user;
  let users = await User.find({ username: { $ne: username } }).select([
    "_id",
    "email",
    "username",
    "avatarImage",
    "fullname",
  ]);

  const data = [];
  users.forEach((user) => {
    data.push({
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      avatarImage: user.avatarImage,
      fullname: user.fullname,
    });
  });

  response.json(data);
});

router.get("/me", async (request, response) => {
  response.json(request.session.user);
});

module.exports = router;
