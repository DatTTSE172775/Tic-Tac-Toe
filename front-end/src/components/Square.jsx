import PropTypes from "prop-types";
import React from "react";

const Square = React.memo(({ value, onClick }) => {
  const buttonClass =
    value === "X"
      ? "button is-info has-text-weight-bold"
      : value === "O"
      ? "button is-danger has-text-weight-bold"
      : "button is-light";

  return (
    <button
      className={`${buttonClass}`}
      style={{
        height: "45px",
        width: "45px",
        fontSize: "1.2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0",
        border: "1px solid #ddd",
      }}
      onClick={onClick}
    >
      {value}
    </button>
  );
});

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Square.displayName = "Square";

export default Square;
