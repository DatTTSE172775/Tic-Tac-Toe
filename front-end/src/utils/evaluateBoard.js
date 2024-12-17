import { checkWinner } from "./checkWinner";

// Đánh giá điểm số bàn cờ
export const evaluateBoard = (board) => {
  const result = checkWinner(board);
  if (result === "O") return +10; // AI thắng
  if (result === "X") return -10; // Người chơi thắng
  return 0; // Hòa
};
