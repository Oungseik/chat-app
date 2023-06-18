// @ts-check
require("dotenv").config();
const { log } = require("./lib/logger");

const app = require("./app");
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000;

io.on("connection", (socket) => {
  log("a user is connected!");

  socket.on("disconnect", () => {
    log("a user is disconnect!");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  log("Server is running on PORT", PORT);
});
