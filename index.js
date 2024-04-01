document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const restartButton = document.getElementById("restart-btn");
  const score = document.getElementById("score");

  let currentPlayer = "X";
  let gameBoard = ["", "", "", "", "", "", "", "", ""];

  // Create the game board cells dynamically
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);

    cell.addEventListener("click", () => handleCellClick(cell));
  }

  restartButton.addEventListener("click", restartGame);

  function handleCellClick(cell) {
    const index = cell.dataset.index;

    if (gameBoard[index] === "" && !checkWinner()) {
      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer);

      if (checkWinner()) {
        setTimeout(() => {
          score.innerText = `Player ${currentPlayer} wins!`;
        }, 10);
      } else if (!gameBoard.includes("")) {
        setTimeout(() => {
          score.innerText = `It's a Draw!`;
        }, 10);
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return true;
      }
    }

    return false;
  }

  function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.classList.remove("X", "O");
    });

    score.innerText = "";
  }
});
