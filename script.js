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
    const response = await fetch("https://e-chain-1.vercel.app/api/ask", {
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
/* =========================
   MINI GAMES LOGIC
========================= */

// Show selected game
function showGame(gameId) {
  document.querySelectorAll(".game").forEach(g => g.style.display = "none");
  document.getElementById(gameId).style.display = "block";
}

/* 🎯 NUMBER GUESSING GAME */
let secretNumber = Math.floor(Math.random() * 10) + 1;

function checkGuess() {
  const guess = Number(document.getElementById("guessInput").value);
  const result = document.getElementById("guessResult");

  if (guess === secretNumber) {
    result.textContent = "🎉 Correct! New number generated.";
    secretNumber = Math.floor(Math.random() * 10) + 1;
  } else {
    result.textContent = "❌ Try again!";
  }
}

/* ❌⭕ TIC TAC TOE */
let board = Array(9).fill("");
let currentPlayer = "X";

const boardDiv = document.getElementById("board");
boardDiv.style.display = "grid";
boardDiv.style.gridTemplateColumns = "repeat(3, 60px)";
boardDiv.style.gap = "5px";

function drawBoard() {
  boardDiv.innerHTML = "";
  board.forEach((cell, i) => {
    const btn = document.createElement("button");
    btn.textContent = cell;
    btn.style.height = "60px";
    btn.style.fontSize = "20px";
    btn.onclick = () => makeMove(i);
    boardDiv.appendChild(btn);
  });
}

function makeMove(i) {
  if (board[i]) return;
  board[i] = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  drawBoard();
}

function resetTTT() {
  board = Array(9).fill("");
  currentPlayer = "X";
  drawBoard();
}

drawBoard();
