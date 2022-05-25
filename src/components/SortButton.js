import React from "react";
import sorticon from "./../assets/icons/sorticon.svg";

const SortButton = ({
  value,
  onChange,
  data,
  placeholder,
  disableEmptyValue = false,
}) => {
  return (
    <select
      className="sortbutton"
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      {!disableEmptyValue && <option value="">{placeholder}</option>}
      {data.map((item, key) => (
        <option key={key} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default SortButton;
