// Xác định các ô gần nước đã đánh
export const getRelevantCells = (board) => {
  const cells = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
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
