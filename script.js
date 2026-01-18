async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");
  const message = input.value.trim();
  if (!message) return;

  chatLog.innerHTML += `<div class="user">🧑 ${message}</div>`;
  input.value = "";

  chatLog.innerHTML += `<div class="bot">🤖 Thinking...</div>`;
  chatLog.scrollTop = chatLog.scrollHeight;

  try {
    const response = await fetch("https://https://https://e-chain-1-5wh9jz8a5-abenojaharold12-sketchs-projects.vercel.app/#ai/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message })
    }).then(res => res.json());

    const thinking = chatLog.querySelector(".bot:last-child");
    if (thinking && thinking.innerText === "🤖 Thinking...") thinking.remove();

    chatLog.innerHTML += `<div class="bot">🤖 ${response.answer}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  } catch (err) {
    console.error(err);
    chatLog.innerHTML += `<div class="bot">🤖 Sorry, something went wrong. Try again later.</div>`;
  }
}
