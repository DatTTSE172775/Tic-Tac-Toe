import { getRelevantCells } from "./getRelevantCells";
import { minimax } from "./minimax";

// AI thực hiện nước đi
export const makeAIMove = (board, updateSquare) => {
  const emptyCells = getRelevantCells(board);

  let move = null;

  if (emptyCells.length === 0) return;

  if (emptyCells.length === board.length * board.length) {
    move = {
      row: Math.floor(board.length / 2),
      col: Math.floor(board.length / 2),
    };
  } else {
    let bestScore = -Infinity;
    for (let { row, col } of emptyCells) {
      board[row][col] = "O";
      const moveScore = minimax(board, 3, false, -Infinity, Infinity);
      board[row][col] = "";
      if (moveScore > bestScore) {
        bestScore = moveScore;
        move = { row, col };
      }
    }
  }

  if (move) updateSquare(move.row, move.col, true);
};
