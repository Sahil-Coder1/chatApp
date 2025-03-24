const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const port = 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static("public"));

io.on("connection", (socket) => {
  io.emit("new-user", { id: socket.id, alert: true });
  socket.on("msg", (msg) => {
    io.emit("message", msg);
  });
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

server.listen(port, () => {});
