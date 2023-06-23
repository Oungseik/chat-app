const { Router } = require("express");
const { getView } = require("../lib/utils");

const mongoose = require("mongoose");
// const User = require("../models/User");
const Message = require("../models/Message");

const multer = require("multer");
const upload = multer();

const chatView = getView("");

const router = Router();

router.get("/", async (_request, response) => {
  response.sendFile(chatView);
});

router.get("/messages/:to", async (request, response) => {
  const from = new mongoose.mongo.ObjectId(request.session.user.id);
  const to = new mongoose.mongo.ObjectId(request.params.to);

  const messages = await Message.find({ users: { $all: [from, to] } }).sort({ updatedAt: 1 });
  console.log(messages);

  response.json({ msg: "hello" });
});

router.post("/messages", upload.none(), async (request, response) => {
  const { from, to, message } = request.body;

  let users;
  if (to instanceof Array) {
    users = [from, ...to].map((user) => new mongoose.mongo.ObjectId(user));
  } else {
    users = [from, to].map((user) => new mongoose.mongo.ObjectId(user));
  }

  const data = await Message.create({
    message,
    sender: from,
    users,
  });

  response.json({ msg: "message send successfully" });
});

module.exports = router;
