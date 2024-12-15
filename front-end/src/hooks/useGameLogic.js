/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { checkWinner } from "../utils/checkWinner";
import generateBoard from "../utils/generateBoard";

export const useGameLogic = () => {
  const [board, setBoard] = useState(generateBoard(10)); // Bàn cờ 10x10
  const [isPlayerX, setIsPlayerX] = useState(true); // Lượt chơi
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isAgainstAI, setIsAgainstAI] = useState(false); // Chế độ AI

  // Hàm đánh giá điểm số
  const evaluateBoard = (board) => {
    const result = checkWinner(board);
    if (result === "O") return +10; // AI thắng
    if (result === "X") return -10; // Người chơi thắng
    return 0; // Hòa
  };

  // Thuật toán Minimax
  const minimax = (board, depth, isMaximizing, alpha, beta) => {
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
            if (beta <= alpha) return maxEval; // Cắt tỉa beta
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
            if (beta <= alpha) return minEval; // Cắt tỉa alpha
          }
        }
      }
      return minEval;
    }
  };

  const getRelevantCells = (board) => {
    const cells = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          // Kiểm tra xung quanh ô (ô trống gần nước đã đánh)
          const neighbors = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
          ];
          for (let [dx, dy] of neighbors) {
            const x = i + dx,
              y = j + dy;
            if (x >= 0 && x < board.length && y >= 0 && y < board[i].length) {
              if (board[x][y] !== "") {
                cells.push({ row: i, col: j });
                break;
              }
            }
          }
        }
      }
    }
    return cells;
  };

  // AI thực hiện nước đi
  const makeAIMove = () => {
    const emptyCells = getRelevantCells(board);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") emptyCells.push({ row: i, col: j });
      }
    }

    let move = null;

    // Chiến lược: Chọn trung tâm hoặc dùng Minimax
    if (emptyCells.length === board.length * board.length) {
      move = {
        row: Math.floor(board.length / 2),
        col: Math.floor(board.length / 2),
      };
    } else if (emptyCells.length > 50) {
      move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
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

  // Cập nhật ô vuông trên bàn cờ
  const updateSquare = (row, col, isAI = false) => {
    if (winner || isDraw || board[row][col] !== "") return;

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? (isPlayerX ? "X" : "O") : cell
      )
    );

    setBoard(newBoard);

    const currentWinner = checkWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      return;
    }

    const isFull = newBoard.every((row) => row.every((cell) => cell !== ""));
    if (isFull) {
      setIsDraw(true);
      return;
    }

    setIsPlayerX(!isPlayerX);
  };

  // Dùng useEffect để máy đánh tự động
  useEffect(() => {
    if (isAgainstAI && !isPlayerX && !winner && !isDraw) {
      setTimeout(makeAIMove, 500); // Máy đánh sau 500ms
    }
  }, [board, isPlayerX, isAgainstAI, winner, isDraw, makeAIMove]);

  // Reset trò chơi
  const resetGame = () => {
    setBoard(generateBoard(10));
    setIsPlayerX(true);
    setWinner(null);
    setIsDraw(false);
  };

  return {
    board,
    updateSquare,
    isPlayerX,
    winner,
    isDraw,
    resetGame,
    setIsAgainstAI,
  };
};
