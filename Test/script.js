document.addEventListener("DOMContentLoaded", function () {
  const columns = 7;
  const rows = 6;
  const board = document.getElementById("game");
  let currentPlayer = "red";
  let winner = null;
  let grid = [];

  // Create game grid
  for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < columns; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.column = col;
      cell.dataset.row = row;
      grid[row][col] = cell;
      board.appendChild(cell);
    }
  }

  // Add event listener to each cell
  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      grid[row][col].addEventListener("click", function () {
        dropPiece(col);
      });
    }
  }

  function dropPiece(col) {
    if (winner !== null) return; // Game over
    let dropRow = null;
    for (let row = rows - 1; row >= 0; row--) {
      if (
        !grid[row][col].classList.contains("red") &&
        !grid[row][col].classList.contains("yellow")
      ) {
        dropRow = row;
        break;
      }
    }
    if (dropRow === null) return; // Column is full

    grid[dropRow][col].classList.add(currentPlayer);

    if (checkWin(dropRow, col)) {
      winner = currentPlayer;
      alert("Player " + winner + " wins!");
    } else {
      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
    }
  }

  function checkWin(row, col) {
    return (
      checkDirection(row, col, 0, 1) || // Horizontal
      checkDirection(row, col, 1, 0) || // Vertical
      checkDirection(row, col, 1, 1) || // Diagonal /
      checkDirection(row, col, 1, -1) // Diagonal \
    );
  }

  function checkDirection(row, col, rowOffset, colOffset) {
    const color = grid[row][col].classList[1];
    let count = 1;
    // Check in one direction
    for (let i = 1; i < 4; i++) {
      const newRow = row + i * rowOffset;
      const newCol = col + i * colOffset;
      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= columns)
        break;
      if (grid[newRow][newCol].classList.contains(color)) {
        count++;
      } else {
        break;
      }
    }
    // Check in the opposite direction
    for (let i = 1; i < 4; i++) {
      const newRow = row - i * rowOffset;
      const newCol = col - i * colOffset;
      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= columns)
        break;
      if (grid[newRow][newCol].classList.contains(color)) {
        count++;
      } else {
        break;
      }
    }
    return count >= 4;
  }
});
