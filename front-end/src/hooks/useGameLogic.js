/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { checkWinner } from "../utils/checkWinner";
import generateBoard from "../utils/generateBoard";

export const useGameLogic = () => {
  const [board, setBoard] = useState(generateBoard(10)); // Tạo bảng 10x10
  const [isPlayerX, setIsPlayerX] = useState(true); // Quản lý lượt chơi: true = X, false = O
  const [winner, setWinner] = useState(null); // Người chiến thắng
  const [isDraw, setIsDraw] = useState(false); // Trạng thái hòa
  const [isAgainstAI, setIsAgainstAI] = useState(false); // Chế độ chơi với AI

  // Hàm để AI thực hiện nước đi
  const makeAIMove = () => {
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === "") {
          emptyCells.push({ row: i, col: j });
        }
      }
    }

    // Nếu còn ô trống, chọn ô ngẫu nhiên
    if (emptyCells.length > 0) {
      const { row, col } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      updateSquare(row, col); // Máy thực hiện nước đi
    }
  };

  const updateSquare = (row, col) => {
    // Nếu đã có người thắng hoặc ô đã được điền, không làm gì
    if (winner || isDraw || board[row][col] !== "") return;

    // Tạo một bản sao mới của bàn cờ
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? (isPlayerX ? "X" : "O") : cell
      )
    );

    // Cập nhật bàn cờ
    setBoard(newBoard);

    // Kiểm tra người thắng
    const currentWinner = checkWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      return;
    }

    // Kiểm tra hòa
    const isFull = newBoard.every((row) => row.every((cell) => cell !== ""));
    if (isFull) {
      setIsDraw(true);
      return;
    }

    // Đổi lượt chơi
    setIsPlayerX(!isPlayerX);
  };

  // useEffect theo dõi lượt chơi và kích hoạt AI nếu cần
  useEffect(() => {
    if (isAgainstAI && !isPlayerX && !winner && !isDraw) {
      setTimeout(makeAIMove, 500); // Máy đánh sau 500ms
    }
  }, [isPlayerX, isAgainstAI, winner, isDraw, makeAIMove]);

  // Reset game
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
    setIsAgainstAI, // Cho phép cấu hình chế độ chơi
  };
};
