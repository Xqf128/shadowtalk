const socket = io();

const chat = document.getElementById("chat");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const msg = input.value.trim();
  if (!msg) return;
  socket.emit("chat message", msg);
  input.value = "";
}

socket.on("chat message", data => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.classList.add(data.self ? "self" : "other");
  div.innerText = data.text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
});