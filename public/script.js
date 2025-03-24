const socket = io();
const btn = document.getElementById("submitBtn");
const msg = document.getElementById("msg");
const allMessages = document.getElementById("messages");
const attach = document.getElementById("attach");
const alert = document.getElementById("img-pre");
let base64String = "";
alert.classList.add("hide");
const Names = [
  "AryanX",
  "NehaByte",
  "RoboRaj",
  "IshaanXEL",
  "KritiNova",
  "VikramXpert",
  "TaraNeural",
  "SiddhAIrth",
  "AadhavSync",
  "MechPriya",
  "Devansh-X",
  "AnviBot",
  "RishiCode",
  "SaiNeura",
  "AaravXen",
  "TanviAI",
  "MechManav",
  "KiranOS",
  "ShreyaNetic",
  "OmCyber",
];

socket.on("message", (msg) => {
  const li = document.createElement("li");
  const img = document.createElement("img");
  if (msg?.msg) {
    li.textContent = msg.msg;
  } else if (msg?.img) {
    img.src = msg.img;
    img.classList.add("chat-img");
    li.classList.add("img-li");
    li.appendChild(img);
  }

  if (msg.id == socket.id) {
    li.classList.add("me");
  } else {
    li.classList.add("other-guy");
  }

  allMessages.appendChild(li);
  allMessages.scrollTop = allMessages.scrollHeight;
});

socket.on("new-user", () => {
  allMessages.innerHTML = null;
  const person = Math.floor(Math.random() * 20);
  const user = document.getElementById("user");
  user.innerText = Names[person];
});

btn.addEventListener("click", () => {
  sendMessage();
});

msg.addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    sendMessage();
  }
});

const sendMessage = () => {
  const data = { id: socket.id, msg: msg.value };
  socket.emit("msg", data);
  msg.value = "";
};

attach.addEventListener("click", () => {
  document.getElementById("imageInput").click();
});

document.getElementById("imageInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = function () {
      const base64 = reader.result;
      base64String = base64;
    };
    reader.readAsDataURL(file);
    alert.classList.add("show");
    const fileURL = URL.createObjectURL(file);
    document.getElementById("preview").src = fileURL;
  }
});

document.getElementById("cancel").addEventListener("click", () => {
  alert.classList.remove("show");
  alert.classList.add("hide");
});
document.getElementById("sendImg").addEventListener("click", () => {
  sendImage();
});

const sendImage = () => {
  const data = { id: socket.id, img: base64String };
  socket.emit("msg", data);
  alert.classList.remove("show");
  alert.classList.add("hide");
};
