const express = require("express");
const app = express();

// const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server({ cors: true });
const cors = require("cors");
const bodyParser = require("body-parser");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.json());
app.use(cors());

const emailSocketMapping = new Map();
const socketEmailMapping = new Map();

io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("join-room", (data) => {
    const { name, roomId } = data;
    socket.join(roomId);
    emailSocketMapping.set(name, socket.id);
    socketEmailMapping.set(socket.id, name);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-entered", { name });
    console.log("a user connected", data);
  });

  socket.on("send-offer", (data) => {
    const { name, offer } = data;
    const fromEmail = socketEmailMapping.get(socket.id);
    const socketId = emailSocketMapping.get(name);
    socket
      .to(socketId)
      .emit("incoming-call", { from: fromEmail, offer: offer });
  });

  socket.on("offer-accepted", (data) => {
    const { from, answer } = data;
    console.log(from, answer);
    const socketId = emailSocketMapping.get(from);
    socket.to(socketId).emit("offer-accepted", { answer: answer });
  });
});

app.listen(3000, () => {
  console.log("listening on *:3000");
});

io.listen(3001);
