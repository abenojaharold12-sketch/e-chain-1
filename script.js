async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");
  const message = input.value.trim();
  if (!message) return;

  // Show user's message
  chatLog.innerHTML += `<div class="user">🧑 ${message}</div>`;
  input.value = "";

  // Show "thinking" indicator
  chatLog.innerHTML += `<div class="bot">🤖 Thinking...</div>`;
  chatLog.scrollTop = chatLog.scrollHeight;

  try {
    const response = await fetch("https://YOUR_VERCEL_APP_URL/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message })
    }).then(res => res.json());

    // Remove "Thinking..." message
    const thinking = chatLog.querySelector(".bot:last-child");
    if (thinking && thinking.innerText === "🤖 Thinking...") thinking.remove();

    // Show actual AI response
    chatLog.innerHTML += `<div class="bot">🤖 ${response.answer}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  } catch (err) {
    console.error(err);
    chatLog.innerHTML += `<div class="bot">🤖 Sorry, something went wrong.</div>`;
  }
}
