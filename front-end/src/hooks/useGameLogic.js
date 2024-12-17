/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { checkWinner } from "../utils/checkWinner";
import generateBoard from "../utils/generateBoard";
import { makeAIMove } from "../utils/makeAIMove";

export const useGameLogic = () => {
  const [board, setBoard] = useState(generateBoard(10));
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isAgainstAI, setIsAgainstAI] = useState(false);

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

    if (newBoard.every((row) => row.every((cell) => cell !== ""))) {
      setIsDraw(true);
      return;
    }

    setIsPlayerX(!isPlayerX);
  };

  useEffect(() => {
    if (isAgainstAI && !isPlayerX && !winner && !isDraw) {
      setTimeout(() => makeAIMove(board, updateSquare), 500);
    }
  }, [board, isPlayerX, isAgainstAI, winner, isDraw, updateSquare]);

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
