// @ts-check
require("dotenv").config();
const { log } = require("./lib/logger");

const app = require("./app");
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000;

io.on("connection", async (socket) => {
  log("a user is connected!");
  // io.emit("chat message", `a user with the id of ${socket.handshake.query.user_id} is connected!`);

  socket.on("setSocketId", (data) => {
    io.emit("chat message", `${data.name} is connected`);
  });

  socket.on("disconnect", () => {
    io.emit("chat message", "a user is disconnected!");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  log("Server is running on PORT", PORT);
});
