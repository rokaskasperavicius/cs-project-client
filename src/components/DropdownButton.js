import React from "react";

const DropdownButton = ({ value, onChange, data, placeholder }) => {
  return (
    <select
      className="dropdown"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      <option value="">{placeholder}</option>
      {data.map((item, key) => (
        <option key={key} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default DropdownButton;
