function sendMessage() {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  const message = input.value.trim();
  if (!message) return;

  chatLog.innerHTML += `<div class="user">🧑 ${message}</div>`;
  input.value = "";

  const response = getBotResponse(message.toLowerCase());

  setTimeout(() => {
    chatLog.innerHTML += `<div class="bot">🤖 ${response}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 500);
}

function getBotResponse(msg) {
  if (msg.includes("hi") || msg.includes("hello"))
    return "Hello! How can I help you today?";

  if (msg.includes("what is e-chain"))
    return "E-Chain is a QR-based smart keychain with games and an AI assistant.";

  if (msg.includes("who made you"))
    return "I was created by students as part of the E-Chain project.";

  if (msg.includes("what can you do"))
    return "I can answer general questions and explain our product.";

  if (msg.includes("game"))
    return "We offer simple browser games accessible through our QR code.";

  if (msg.includes("thank"))
    return "You're welcome! 😊";

  return "I’m still learning. Try asking another question!";
}
