import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
display: block;
padding: 15px 1px;
margin: 10px 0px;
background-color: white;
border-radius: 10px;
border: 1px solid black;
color: black;
text-align: center;
text-decoration: none;
display: inline-block;
font-size: 16px;
`



export const Input = ({ placeholder }) => (
  <StyledInput id="test" className="custom-input" placeholder={placeholder} />
);
