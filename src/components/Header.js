import homeicon from "./Icons/home.svg";
import React from "react";
import { Link } from "react-router-dom";

export const Header = () => (
  <header className="header">
    <p className="header__title">CS project</p>
    <div className="header-product"></div>
    <Link to="/" activeStyle>
      <img alt="home icon" src={homeicon} width="40" height="40" />
    </Link>
  </header>
);
