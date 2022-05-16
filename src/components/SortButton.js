import React from "react";
import sorticon from "./../assets/icons/sorticon.svg";

const SortButton = ({ value, onChange, data, placeholder }) => {
    return (
            <select
            className="sortbutton"
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

export default SortButton;
