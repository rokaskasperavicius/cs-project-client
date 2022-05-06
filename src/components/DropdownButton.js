import React from "react";
import PropTypes from "prop-types";

const DropdownButton = ({ value, onChange, data, placeholder }) => {
  return (
    <div className="">
      <select onChange={(e) => onChange(e.target.value)} value={value}>
        <option value="">{placeholder}</option>
        {data.map((item, key) => (
          <option key={key} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

DropdownButton.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  data: PropTypes.array.isRequired,
  styleClass: PropTypes.string,
};

DropdownButton.defaultProps = {
  value: "",
  placeholder: "",
};

export default DropdownButton;
