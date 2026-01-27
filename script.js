async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");
  const message = input.value.trim();
  if (!message) return;

  // Show user message
  chatLog.innerHTML += `<div class="user">🧑 ${message}</div>`;
  input.value = "";

  // Thinking message
  const thinking = document.createElement("div");
  thinking.className = "bot";
  thinking.textContent = "🤖 Thinking...";
  chatLog.appendChild(thinking);
  chatLog.scrollTop = chatLog.scrollHeight;

  // Offline AI with fixed questions
  function offlineAI(msg) {
    const q = msg.toLowerCase();

    const fixedAnswers = {
      "what is e-chain?": "E-Chain is a smart keychain with a QR code for students.",
      "how much does e-chain cost?": "E-Chain is affordable and student-friendly.",
      "who made you?": "I was created by the E-Chain team for students.",
      "what games are there?": "You can play Flappy, Frogger, Tic-Tac-Toe, and Tetris!",
      "how do i scan the qr?": "Just use any QR scanner on your phone to access the content."
    };

    if (fixedAnswers[q]) return fixedAnswers[q];
    if (q.includes("e-chain")) return "E-Chain is a smart keychain with a QR code.";
    if (q.includes("game")) return "Scan the QR code to access fun games!";
    if (q.includes("price") || q.includes("cost")) return "E-Chain is student-friendly and affordable.";

    return "I'm currently offline, but I'm still here to help!";
  }

  try {
    // Try online AI
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message })
    });

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();
    thinking.remove();
    chatLog.innerHTML += `<div class="bot">🤖 ${data.answer}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;

    // Clear offline badge if online AI works
    const badge = document.getElementById("ai-mode-badge");
    if (badge) badge.textContent = "";

  } catch (error) {
    // Use offline AI if online fails
    thinking.remove();
    const answer = offlineAI(message);
    chatLog.innerHTML += `<div class="bot">🤖 ${answer}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;

    // Show Offline Mode badge
    const badge = document.getElementById("ai-mode-badge");
    if (badge) badge.textContent = "Offline Mode";
  }
}
