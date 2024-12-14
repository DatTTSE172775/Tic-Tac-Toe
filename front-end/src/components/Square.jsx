import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

const Square = React.memo(({ value, onClick }) => {
  return (
    <Button
      height="45px" // Cố định kích thước ô vuông
      width="45px"
      bg={value === "X" ? "blue.500" : value === "O" ? "red.500" : "white"}
      color={value ? "white" : "black"}
      fontSize="lg" // Kích thước chữ lớn hơn
      fontWeight="bold" // Chữ đậm hơn
      border="2px solid gray" // Đường viền đậm hơn
      borderRadius="md"
      _hover={{
        bg: "gray.200", // Hiệu ứng hover
      }}
      _active={{
        bg: "gray.400", // Hiệu ứng khi click
      }}
      transition="all 0.2s" // Tăng độ mượt
      onClick={onClick}
    >
      {value}
    </Button>
  );
});
Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Square.displayName = "Square";

export default Square;
