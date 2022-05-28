import React from "react";
import { Link } from "react-router-dom";
import mylist from "../assets/icons/mylist.svg";
import addproduct from "../assets/icons/addproduct.svg";
import myprofile from "../assets/icons/myprofile.svg";

export const Footer = () => (
  <footer className="footer">
    <div className="footer-product__wrapper">
      <Link to="/myproducts" activeStyle>
        <p className="footer-product">
          <span>My products</span>
          <img alt="list icon" src={mylist} width="30" height="30" />
        </p>
      </Link>
      <Link to="/addproduct" activeStyle>
        <p className="footer-product">
          <span>Add product</span>
          <img alt="product icon" src={addproduct} width="30" height="30" />
        </p>
      </Link>
      <Link to="/myprofile" activeStyle>
        <p className="footer-product">
          <span>My profile</span>
          <img alt="profile icon" src={myprofile} width="30" height="30" />
        </p>
      </Link>
    </div>
  </footer>
);