import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import GameBoard from "./components/GameBoard";
import GameStatus from "./components/GameStatus";
import { useGameLogic } from "./hooks/useGameLogic";

function App() {
  const { board, updateSquare, isPlayerX } = useGameLogic();

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
      <Heading mb={8} fontSize="3xl">
        Caro Game
      </Heading>
      <GameStatus isPlayerX={isPlayerX} /> {/* Hiển thị lượt chơi */}
      <Box mt={6}>
        <GameBoard board={board} onSquareClick={updateSquare} />
      </Box>
    </Flex>
  );
}

export default App;
