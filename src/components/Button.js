import React from "react";

export const Button = ({ onClick, children, className = "", disabled, image }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={"button " + className}
      image = {image}
    >
      {children}
    </button>
  );
};
