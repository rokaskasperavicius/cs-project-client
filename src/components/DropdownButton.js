import React, {useEffect, useState} from "react"
import PropTypes from "prop-types";

const DropdownButton = ({value, data, placeholder, dropdownStyle}) =>{

    const [name, setName] = useState("");

    const handleChange = () => {
        console.log("CALL BACKEND IMMEDIATELY");
    };

    useEffect(() => {
        handleChange();
    }, [name]);


    return(
        <div className="">
            <select
                onChange={(e) => setName(e.target.value)}
                value = {value}
                className="">
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
    dropdownStyle: ""
};

export default DropdownButton;