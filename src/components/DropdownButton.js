//WORKING ON IT

import React from "react"
import PropTypes from "prop-types";

const DropdownButton = ({value, data, placeholder, onChange}) =>{

    const handleChange = (event) => {
        const {value} = event.target;
        onChange(value);
    };

    return(
        <div className="">
            <select
                value = {value}
                className="from-control"
                onChange={handleChange}>
                <option value="">{placeholder}</option>
                {data.map((item, key) => (
                    <option
                        key = {key}
                        value ={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    )

};


DropdownButton.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    data: PropTypes.array.isRequired,
    styleClass: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

DropdownButton.defaultProps = {
    value: "",
    placeholder: "",
    styleClass: ""
};

export default DropdownButton;