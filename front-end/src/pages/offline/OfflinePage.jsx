import { useNavigate } from "react-router-dom";
import GameBoard from "../../components/GameBoard";
import GameStatus from "../../components/GameStatus";
import { useGameLogic } from "../../hooks/useGameLogic";
import "../../styles/pages/OfflinePage.css";

const OfflinePage = () => {
  const { board, updateSquare, isPlayerX, winner, isDraw, resetGame } =
    useGameLogic();
  const navigate = useNavigate();

  return (
    <div className="offline-container">
      <h1 className="title">Caro Game - Chế độ Offline</h1>
      <GameStatus isPlayerX={isPlayerX} winner={winner} isDraw={isDraw} />
      <GameBoard board={board} onSquareClick={updateSquare} />
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

export default OfflinePage;
