import { useState } from "react";
import generateBoard from "../utils/generateBoard";

export const useGameLogic = () => {
  const [board, setBoard] = useState(generateBoard(10)); // Tạo bảng 10x10
  const [isPlayerX, setIsPlayerX] = useState(true); // Quản lý lượt chơi: true = X, false = O

  const updateSquare = (row, col) => {
    // Nếu ô đã có giá trị, không làm gì
    if (board[row][col] !== "") return;

    // Cập nhật giá trị X/O tùy theo lượt chơi
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? (isPlayerX ? "X" : "O") : cell
      )
    );

    setBoard(newBoard); // Cập nhật trạng thái bàn cờ
    setIsPlayerX(!isPlayerX); // Đổi lượt chơi
  };

  return { board, updateSquare, isPlayerX };
};
