const socket = io();

const chat = document.getElementById("chat");
const welcome = document.getElementById("welcome");

socket.on("message", (msg) => {
  const p = document.createElement("p");
  p.innerText = msg;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
});

function send() {
  const input = document.getElementById("msg");
  if (input.value.trim() !== "") {
    socket.emit("message", input.value);
    input.value = "";
  }
  let currentRoom = "global";

function join(room) {
  chat.innerHTML = "";
  currentRoom = room;
  socket.emit("join", room);
}
}