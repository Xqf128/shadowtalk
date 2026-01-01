const socket = io();

const chat = document.getElementById("chat");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.onclick = sendMessage;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  if (input.value.trim() === "") return;
  socket.emit("message", input.value);
  input.value = "";
}

socket.on("message", data => {
  const msg = document.createElement("div");
  msg.classList.add("message");

  if (data.self) {
    msg.classList.add("self");
  } else {
    msg.classList.add("other");
  }

  msg.innerText = data.text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
});
