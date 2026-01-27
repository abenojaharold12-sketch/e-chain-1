async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");
  const message = input.value.trim();
  if (!message) return;

  // Add user message
  chatLog.innerHTML += `<div class="user">🧑 ${message}</div>`;
  input.value = "";

  // Add Thinking message
  const thinking = document.createElement("div");
  thinking.className = "bot";
  thinking.textContent = "🤖 Thinking...";
  chatLog.appendChild(thinking);
  chatLog.scrollTop = chatLog.scrollHeight;

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message })
    });

    const data = await res.json();
    thinking.remove();

    chatLog.innerHTML += `<div class="bot">🤖 ${data.answer}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;

  } catch (err) {
    thinking.remove();
    chatLog.innerHTML += `<div class="bot">🤖 Error connecting to AI.</div>`;
    console.error(err);
  }
}
