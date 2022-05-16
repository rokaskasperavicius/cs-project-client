import React from "react";

export const Button = ({ onClick, children, className = "", disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={"button " + className}
    >
      {children}
    </button>
  );
};
