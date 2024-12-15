import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GameBoard from "../../components/GameBoard";
import GameStatus from "../../components/GameStatus";
import { useGameLogic } from "../../hooks/useGameLogic";
import "../../styles/pages/OfflinePage.css";

const RobotPage = () => {
  const {
    board,
    updateSquare,
    isPlayerX,
    winner,
    isDraw,
    resetGame,
    setIsAgainstAI,
  } = useGameLogic(10);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAgainstAI(true);
  }, [setIsAgainstAI]);

  return (
    <div className="offline-container">
      {/* Tiêu đề */}
      <h1 className="title">Caro Game - Chế độ Chơi với AI</h1>

      {/* Thông báo trạng thái */}
      <GameStatus isPlayerX={isPlayerX} winner={winner} isDraw={isDraw} />

      {/* Bàn cờ */}
      <div className="game-board">
        <GameBoard board={board} onSquareClick={updateSquare} />
      </div>

      {/* Các nút điều khiển */}
      <div className="buttons">
        <button className="button is-link" onClick={resetGame}>
          Reset Game
        </button>
        <button className="button is-danger" onClick={() => navigate("/")}>
          Quay về Trang Chính
        </button>
      </div>
    </div>
  );
};

export default RobotPage;
