// @ts-check
require("dotenv").config();
const { log, error } = require("./lib/logger");

const mongoose = require("mongoose");
mongoose
  .connect(/** @type {string} */ (process.env.MONGODB_URL))
  .then(() => {
    log("conected to the MongoDB");
  })
  .catch((err) => {
    error(err);
  });

const app = require("./app");
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const onlineUsers = new Map();

io.on("connection", async (socket) => {
  global.sio = socket;

  socket.on("add-active-user", async (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", async (data) => {
    const receiveUserSocket = onlineUsers.get(data.to);

    if (receiveUserSocket) {
      socket.to(receiveUserSocket).emit("receive-msg", data);
    }
  });
});

server.listen(PORT, () => {
  log("Server is running on PORT", PORT);
});
