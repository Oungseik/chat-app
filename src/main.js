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

let onlineUsers = new Map();
let activeSockets = new Map();

io.on("connection", async (socket) => {
  global.sio = socket;

  socket.on("add-active-user", async (userId) => {
    onlineUsers.set(socket.id, userId);
    activeSockets.set(userId, socket.id);
    io.emit("get-users", [...onlineUsers.values()]);
  });

  socket.on("disconnect", async () => {
    const userId = onlineUsers.get(socket.id);
    onlineUsers.delete(socket.id);
    activeSockets.delete(userId);
    io.emit("get-users", [...onlineUsers.values()]);
  });

  socket.on("send-msg", async (data) => {
    const receiveUserSocket = activeSockets.get(data.to);

    if (receiveUserSocket) {
      socket.to(receiveUserSocket).emit("receive-msg", data);
    }
  });
});

server.listen(PORT, () => {
  log("Server is running on PORT", PORT);
});
