import PropTypes from "prop-types";
import "../styles/GameBoard.css";

const GameBoard = ({ board, onSquareClick }) => {
  return (
    <div className="game-board">
      {board.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`square ${value ? value.toLowerCase() : ""}`}
            onClick={() => onSquareClick(rowIndex, colIndex)}
          >
            {value}
          </div>
        ))
      )}
    </div>
  );
};

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  onSquareClick: PropTypes.func.isRequired,
};

export default GameBoard;
