const { Router } = require("express");
const { getView } = require("../lib/utils");

const mongoose = require("mongoose");
const Message = require("../models/Message");

const { upload } = require("../middlewares/fileStorage.js");

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
    .select(["_id", "message", "sender", "users", "updatedAt", "images"]);

  const data = messages.map(({ _id, message, sender, users, updatedAt, images }) => ({
    id: _id.toString(),
    message,
    sender: sender.toString(),
    users: users.map((user) => user.toString()),
    updatedAt,
    images
  }));

  response.json(data);
});

router.post("/messages", upload.array("files"), async (request, response) => {
  const { from, to, message } = request.body;

  if (!message && request.files.length < 1) return response.status(400).end();

  let users;
  if (to instanceof Array) {
    users = [from, ...to];
  } else {
    users = [from, to];
  }

  const files = request.files.map(file => `/uploads/${file.filename}`);

  const data = await Message.create({
    message,
    sender: from,
    users,
    images: files,
  });

  response.json({
    id: data._id,
    message: data.message,
    sender: data.sender,
    users: data.users,
    images: data.images,
    updatedAt: data.updatedAt,
  });
});

module.exports = router;
