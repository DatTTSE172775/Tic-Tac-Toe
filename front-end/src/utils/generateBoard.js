const generateBoard = (size) => {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(""));
};

export default generateBoard;
