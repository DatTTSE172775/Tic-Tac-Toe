import { evaluateBoard } from "./evaluateBoard";

// Thuật toán Minimax với cắt tỉa alpha-beta
export const minimax = (board, depth, isMaximizing, alpha, beta) => {
  const score = evaluateBoard(board);

  // Trả về điểm số nếu đã thắng, hòa hoặc đạt giới hạn độ sâu
  if (score === 10 || score === -10 || depth === 0) return score;

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          board[i][j] = "O";
          const evalScore = minimax(board, depth - 1, false, alpha, beta);
          board[i][j] = "";
          maxEval = Math.max(maxEval, evalScore);
          alpha = Math.max(alpha, evalScore);
          if (beta <= alpha) return maxEval;
        }
      }
    }
    return maxEval;
  } else {
    let minEval = +Infinity;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          board[i][j] = "X";
          const evalScore = minimax(board, depth - 1, true, alpha, beta);
          board[i][j] = "";
          minEval = Math.min(minEval, evalScore);
          beta = Math.min(beta, evalScore);
          if (beta <= alpha) return minEval;
        }
      }
    }
    return minEval;
  }
};
