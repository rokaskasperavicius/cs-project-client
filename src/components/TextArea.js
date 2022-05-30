import React from "react";

export const TextArea = React.forwardRef(({ placeholder, ...props }, ref) => (
  <textarea
    {...props}
    ref={ref}
    placeholder={placeholder}
    className="textarea"
  />
));
