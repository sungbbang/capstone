const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`CHAT CONNECTING USER ID: ${socket.id}`);
  socket.on("join_room", (userName, roomName) => {
    socket.join(roomName);
    console.log(`JOIN USER ID: ${socket.id}`);
    console.log(`JOIN USER NAME: ${userName}`);
    console.log(`JOIN USER ROOM: ${roomName}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("DISCONNECTING");
  });
});

server.listen(3002, () => {
  console.log("Chat Server is running");
});
