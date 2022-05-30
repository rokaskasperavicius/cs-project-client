import React from "react";

export const Button = ({ onClick, children, disabled }) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
