async function askAI() {
  const question = document.getElementById("question").value;
  const answerBox = document.getElementById("answer");

  answerBox.innerText = "Thinking...";

  // OFFLINE fallback AI
  function offlineAI(q) {
    q = q.toLowerCase();

    if (q.includes("e-chain"))
      return "E-Chain is a smart keychain with a QR code for students.";

    if (q.includes("price"))
      return "E-Chain is affordable and student-friendly.";

    if (q.includes("game"))
      return "Scan the QR code to access fun games and content.";

    return "I'm currently offline, but I'm still here to help!";
  }

  try {
    // Try ONLINE AI
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();
    answerBox.innerText = data.answer;

  } catch (error) {
    console.warn("Using offline AI:", error);
    answerBox.innerText = offlineAI(question);
  }
}
