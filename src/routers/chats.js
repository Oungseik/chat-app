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

  const messages = await Message.find({ users: { $all: [from, to] } })
    .sort({ updatedAt: 1 })
    .select(["_id", "message", "sender", "users", "updatedAt"]);

  const data = messages.map(({ _id, message, sender, users, updatedAt }) => ({
    id: _id.toString(),
    message,
    sender: sender.toString(),
    users: users.map((user) => user.toString()),
    updatedAt,
  }));

  response.json(data);
});

router.post("/messages", upload.none(), async (request, response) => {
  const { from, to, message } = request.body;

  let users;
  if (to instanceof Array) {
    users = [from, ...to];
  } else {
    users = [from, to];
  }

  const data = await Message.create({
    message,
    sender: from,
    users,
  });

  response.json({
    id: data._id,
    message: data.message,
    sender: data.sender,
    users: data.users,
    updatedAt: data.updatedAt,
  });
});

module.exports = router;
