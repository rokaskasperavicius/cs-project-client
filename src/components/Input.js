import React from "react";

export const Input = React.forwardRef(
  ({ type = "text", placeholder, className = "", ...props }, ref) => (
    <input
      ref={ref}
      {...props}
      type={type}
      className={className}
      placeholder={placeholder}
    />
  )
);
