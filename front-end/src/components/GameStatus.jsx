import PropTypes from "prop-types";
import "../styles/GameStatus.css";

const GameStatus = ({ isPlayerX, winner, isDraw }) => {
  return (
    <div
      className={`game-status ${
        winner
          ? "is-winner"
          : isDraw
          ? "is-draw"
          : isPlayerX
          ? "is-player-x"
          : "is-player-o"
      }`}
    >
      {winner ? (
        <span className="winner-message">
          🎉 Người thắng: <strong>{winner}</strong> 🎉
        </span>
      ) : isDraw ? (
        <span className="draw-message">🤝 Trận đấu hòa! 🤝</span>
      ) : (
        <span>
          Lượt chơi của <strong>{isPlayerX ? "X" : "O"}</strong>
        </span>
      )}
    </div>
  );
};

GameStatus.propTypes = {
  isPlayerX: PropTypes.bool.isRequired,
  winner: PropTypes.string,
  isDraw: PropTypes.bool.isRequired,
};

export default GameStatus;
