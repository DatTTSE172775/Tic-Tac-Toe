import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
  const { board, updateSquare, isPlayerX, winner, isDraw, resetGame } =
    useGameLogic();

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
        Caro Game
      </Heading>
      {winner ? (
        <Text fontSize="2xl" fontWeight="bold" color="green.400" mb={4}>
          Người thắng: {winner}
        </Text>
      ) : isDraw ? (
        <Text fontSize="2xl" fontWeight="bold" color="green.400" mb={4}>
          Kết quả: Hòa!
        </Text>
      ) : (
        <GameStatus isPlayerX={isPlayerX} />
      )}
      <Box mt={6}>
        <GameBoard
          board={board}
          onSquareClick={winner ? () => {} : updateSquare}
        />
      </Box>
      {/* Nút Reset */}
      <Button
        mt={6}
        colorScheme="teal"
        onClick={resetGame}
        size="lg"
        variant="solid"
      >
        Reset Game
      </Button>
    </Flex>
  );
}

export default App;
