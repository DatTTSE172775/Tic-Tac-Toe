import { useState } from "react";
import { checkWinner } from "../utils/checkWinner";
import generateBoard from "../utils/generateBoard";

export const useGameLogic = () => {
  const [board, setBoard] = useState(generateBoard(10)); // Tạo bảng 10x10
  const [isPlayerX, setIsPlayerX] = useState(true); // Quản lý lượt chơi: true = X, false = O
  const [winner, setWinner] = useState(null); // Người chiến thắng
  const [isDraw, setIsDraw] = useState(false); // Trạng thái hòa

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
      setWinner(currentWinner); // Cập nhật người thắng
      return; // Dừng lại sau khi cập nhật người thắng
    } else {
      const isFull = newBoard.every((row) => row.every((cell) => cell !== ""));
      if (isFull) {
        setIsDraw(true);
      } else {
        // Đổi lượt chơi nếu chưa có người thắng
        setIsPlayerX(!isPlayerX);
      }
    }
  };

  // reset game
  const resetGame = () => {
    setBoard(generateBoard(10));
    setIsPlayerX(true);
    setWinner(null);
  };

  return { board, updateSquare, isPlayerX, winner, isDraw, resetGame };
};
