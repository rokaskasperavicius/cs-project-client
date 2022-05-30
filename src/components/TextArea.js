import React from "react";

export const TextArea = React.forwardRef(
  ({ placeholder, className, ...props }, ref) => (
    <textarea
      {...props}
      ref={ref}
      placeholder={placeholder}
      className={className}
    />
  )
);
