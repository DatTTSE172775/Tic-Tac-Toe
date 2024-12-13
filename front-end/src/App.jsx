import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
  const { board, updateSquare, isPlayerX, winner } = useGameLogic();

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
      ) : (
        <GameStatus isPlayerX={isPlayerX} />
      )}
      <Box mt={6}>
        <GameBoard
          board={board}
          onSquareClick={winner ? () => {} : updateSquare}
        />
      </Box>
    </Flex>
  );
}

export default App;
