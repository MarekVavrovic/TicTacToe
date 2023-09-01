const winSound = document.getElementById("winSound");
const clickSound = document.getElementById("clickSound");

const boardElement = document.getElementById("board");
const boardSizeSelect = document.getElementById("boardSizeSelect");
const boardWinSelect = document.getElementById("boardWinSelect");

let boardWin = parseInt(boardWinSelect.value);
let boardSize = parseInt(boardSizeSelect.value);



let currentPlayer = "X";
let board = new Array(boardSize)
  .fill(null)
  .map(() => new Array(boardSize).fill(null));



function createBoard() {
  boardElement.innerHTML = "";
  boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 70px)`;

  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", handleCellClick);
      boardElement.appendChild(cell);
    }
  }
}


function handleCellClick(event) {
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  if (board[row][col] === null) {
    event.target.textContent = currentPlayer;
    board[row][col] = currentPlayer;
     playSound(clickSound);

    if (checkWin(row, col)) {
       
      alert(currentPlayer + " wins!");
      playSound(winSound);
      resetGame();
    } else if (checkDraw()) {
   
      alert("It's a draw!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function playSound(soundElement) {
  soundElement.currentTime = 0;
  soundElement.play();
}

function checkWin(row, col) {
  // Check rows
  let rowCount = 0;
  for (let c = 0; c < boardSize; c++) {
    if (board[row][c] === currentPlayer) {
      rowCount++;
      if (rowCount === boardWin) {
        return true;
      }
    } else {
      rowCount = 0; // Reset if the sequence is broken
    }
  }

  // Check columns
  let colCount = 0;
  for (let r = 0; r < boardSize; r++) {
    if (board[r][col] === currentPlayer) {
      colCount++;
      if (colCount === boardWin) {
        return true;
      }
    } else {
      colCount = 0; // Reset if the sequence is broken
    }
  }

  // Check diagonals
  let diagonalCount = 0;
  for (let i = 0; i < boardSize; i++) {
    if (board[i][i] === currentPlayer) {
      diagonalCount++;
      if (diagonalCount === boardWin) {
        return true;
      }
    } else {
      diagonalCount = 0; // Reset if the sequence is broken
    }
  }

  let antiDiagonalCount = 0;
  for (let i = 0; i < boardSize; i++) {
    if (board[i][boardSize - 1 - i] === currentPlayer) {
      antiDiagonalCount++;
      if (antiDiagonalCount === boardWin) {
        return true;
      }
    } else {
      antiDiagonalCount = 0; // Reset if the sequence is broken
    }
  }

  return false;
}

function checkDraw() {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  return true;
}

function resetGame() {
  board = new Array(boardSize)
    .fill(null)
    .map(() => new Array(boardSize).fill(null));
  currentPlayer = "X";
  boardElement.innerHTML = "";
  createBoard();
}

//RESET BOARD-SIZE
boardSizeSelect.addEventListener("change", function () {
  boardSize = parseInt(this.value);
  resetGame();
});

//RESET WINNING LOGIC
boardWinSelect.addEventListener("change", function () {
boardWin = parseInt(this.value);
  resetGame();
});


createBoard();
