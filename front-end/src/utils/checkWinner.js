export const checkWinner = (board) => {
  const size = board.length;

  // Kiểm tra hàng
  const checkRow = (row) => {
    for (let i = 0; i <= row.length - 5; i++) {
      const segment = row.slice(i, i + 5);
      if (segment.every((cell) => cell === "X")) {
        return "X";
      }
      if (segment.every((cell) => cell === "O")) {
        return "O";
      }
    }
    return null;
  };

  // Kiểm tra cột
  const checkColumn = (colIndex) => {
    for (let i = 0; i <= board.length - 5; i++) {
      const segment = board.slice(i, i + 5).map((row) => row[colIndex]);
      if (segment.every((cell) => cell === "X")) {
        return "X";
      }
      if (segment.every((cell) => cell === "O")) {
        return "O";
      }
    }
    return null;
  };

  // Kiểm tra đường chéo chính
  const checkMainDiagonal = () => {
    for (let i = 0; i <= size - 5; i++) {
      for (let j = 0; j <= size - 5; j++) {
        const segment = [];
        for (let k = 0; k < 5; k++) {
          segment.push(board[i + k][j + k]);
        }
        if (segment.every((cell) => cell === "X")) {
          return "X";
        }
        if (segment.every((cell) => cell === "O")) {
          return "O";
        }
      }
    }
    return null;
  };

  // Kiểm tra đường chéo phụ
  const checkAntiDiagonal = () => {
    for (let i = 0; i <= size - 5; i++) {
      for (let j = 4; j < size; j++) {
        const segment = [];
        for (let k = 0; k < 5; k++) {
          segment.push(board[i + k][j - k]);
        }
        if (segment.every((cell) => cell === "X")) {
          return "X";
        }
        if (segment.every((cell) => cell === "O")) {
          return "O";
        }
      }
    }
    return null;
  };

  // Kiểm tra tất cả hàng
  for (let row of board) {
    const result = checkRow(row);
    if (result) return result;
  }

  // Kiểm tra tất cả cột
  for (let col = 0; col < size; col++) {
    const result = checkColumn(col);
    if (result) return result;
  }

  // Kiểm tra các đường chéo
  const mainDiagonalResult = checkMainDiagonal();
  if (mainDiagonalResult) return mainDiagonalResult;

  const antiDiagonalResult = checkAntiDiagonal();
  if (antiDiagonalResult) return antiDiagonalResult;

  // Không có người thắng
  return null;
};
