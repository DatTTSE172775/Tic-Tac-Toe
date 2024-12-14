import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import GameBoard from "../../components/GameBoard";
import GameStatus from "../../components/GameStatus";
import { useGameLogic } from "../../hooks/useGameLogic";

const OfflinePage = () => {
  const { board, updateSquare, isPlayerX, winner, isDraw, resetGame } =
    useGameLogic();
  const navigate = useNavigate();

  return (
    <Flex
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
      bg="gray.800"
      color="white"
      flexDirection="column"
    >
      <Heading mb={6} fontSize="3xl">
        Caro Game - Chế độ Offline
      </Heading>
      {winner ? (
        <Box fontSize="2xl" fontWeight="bold" color="green.400" mb={4}>
          Người thắng: {winner}
        </Box>
      ) : isDraw ? (
        <Box fontSize="2xl" fontWeight="bold" color="yellow.400" mb={4}>
          Kết quả: Hòa!
        </Box>
      ) : (
        <GameStatus isPlayerX={isPlayerX} />
      )}
      <Box mt={6}>
        <GameBoard board={board} onSquareClick={updateSquare} />
      </Box>
      <Flex mt={6}>
        <Button colorScheme="teal" onClick={resetGame} mr={4}>
          Reset Game
        </Button>
        <Button colorScheme="red" onClick={() => navigate("/")}>
          Quay về Trang Chính
        </Button>
      </Flex>
    </Flex>
  );
};

export default OfflinePage;
