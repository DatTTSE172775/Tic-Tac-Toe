import { Box, Text } from "@chakra-ui/react";
import React from "react";

const GameStatus = ({ isPlayerX }) => {
  return (
    <Box
      bg="gray.700" // Màu nền của thanh trạng thái
      color="white" // Màu chữ
      py={2} // Padding theo chiều dọc
      px={4} // Padding theo chiều ngang
      borderRadius="md" // Bo góc thanh trạng thái
      textAlign="center" // Căn giữa nội dung
    >
      <Text fontSize="lg" fontWeight="bold">
        {`Lượt chơi của ${isPlayerX ? "X" : "O"}`}
      </Text>
    </Box>
  );
};

export default GameStatus;
