import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
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
      <Heading mb={8} fontSize="4xl">
        Caro Game
      </Heading>
      <Button
        colorScheme="teal"
        size="lg"
        mb={4}
        onClick={() => navigate("/offline")}
      >
        Chơi Offline (2 Người)
      </Button>
      <Button colorScheme="blue" size="lg" onClick={() => navigate("/robot")}>
        Chơi với Máy
      </Button>
    </Flex>
  );
};

export default MainPage;
