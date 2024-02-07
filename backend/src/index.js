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

io.on("connection", (socket) => {
  console.log("new connection");
  socket.on("join-room", (data) => {
    const { name, roomId } = data;
    socket.join(roomId);
    socket.emit("joined-room", { roomId });
    socket.broadcast.to(roomId).emit("user-entered", name);
    console.log("a user connected", data);
  });
});

app.listen(3000, () => {
  console.log("listening on *:3000");
});

io.listen(3001);
