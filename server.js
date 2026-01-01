const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const io = require("socket.io")(http);

const users = {};

// serve public folder
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

// homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// socket logic
io.on("connection", (socket) => {
  users[socket.id] = "User" + Math.floor(Math.random() * 10000);

  socket.emit("message", "Welcome " + users[socket.id]);
  socket.broadcast.emit("message", users[socket.id] + " joined");

  socket.on("message", (msg) => {
    io.emit("message", users[socket.id] + ": " + msg);
  });

  socket.on("disconnect", () => {
    io.emit("message", users[socket.id] + " left");
    delete users[socket.id];
  });
});

// start server
const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});