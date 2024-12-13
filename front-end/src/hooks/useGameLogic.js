import { useState } from "react";
import generateBoard from "../utils/generateBoard";

export const useGameLogic = () => {
  const [board, setBoard] = useState(generateBoard(10)); // Tạo bảng 10x10

  const updateSquare = (row, col) => {
    if (board[row][col] === "") {
      const newBoard = board.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? "X" : cell
        )
      );
      setBoard(newBoard);
    }
  };

  return { board, updateSquare };
};
