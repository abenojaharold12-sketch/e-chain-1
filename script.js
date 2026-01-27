function sendMessage() {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  chatLog.innerHTML += `<div class="user">🧑 ${message}</div>`;
  input.value = "";

  // Fixed offline answers
  const fixedAnswers = {
    "what is e-chain?": "E-Chain is a smart keychain with a QR code that links to games and an AI assistant.",
    "how much does e-chain cost?": "E-Chain is affordable and student-friendly.",
    "who made you?": "I was created by the E-Chain team for students.",
    "what games are there?": "You can play Flappy, Frogger, Tic-Tac-Toe, and Tetris!",
    "how do i scan the qr?": "Use any QR scanner on your phone to access the content."
  };

  const lowerMsg = message.toLowerCase();
  let answer = fixedAnswers[lowerMsg] || "I'm not sure about that. Try one of the suggested questions!";

  // Show AI response
  chatLog.innerHTML += `<div class="bot">🤖 ${answer}</div>`;
  chatLog.scrollTop = chatLog.scrollHeight;
}
