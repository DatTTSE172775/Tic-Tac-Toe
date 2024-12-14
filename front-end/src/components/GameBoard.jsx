import { SimpleGrid } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Square from "./Square";

const GameBoard = ({ board, onSquareClick }) => {
  return (
    <SimpleGrid
      columns={10} // 10 cột
      spacing={0} // Không khoảng cách giữa các ô
      width="fit-content" // Đảm bảo bàn cờ có kích thước vừa với nội dung
      mx="auto" // Căn giữa bàn cờ theo chiều ngang
    >
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            value={value}
            onClick={() => onSquareClick(rowIndex, colIndex)}
          />
        ))
      )}
    </SimpleGrid>
  );
};
GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  onSquareClick: PropTypes.func.isRequired,
};

export default GameBoard;
