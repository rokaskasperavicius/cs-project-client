import React from "react";

const DropdownButton = React.forwardRef(
  ({ options, placeholder, className, ...props }, ref) => (
    <select {...props} ref={ref} className={"dropdown " + className}>
      <option value="">{placeholder}</option>
      {options.map((item, key) => (
        <option key={key} value={item.name}>
          {item.name}
        </option>
      ))}
    </select>
  )
);

export default DropdownButton;
