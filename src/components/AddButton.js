import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
background-color: white;
padding: 5px 20px;
border: 1px solid black;
border-radius: 10px;
color: black;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
`
export const AddButton = ({children, className}) => {
    return(
        <StyledButton className = {className}>{children}</StyledButton>
    )
}