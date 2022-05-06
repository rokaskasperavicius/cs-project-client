import React from "react";
import { Link } from "react-router-dom";
import mylist from "./Icons/mylist.svg";
import addproduct from "./Icons/addproduct.svg";
//import myprofile from "./Icons/myprofile.svg";

export const Footer = () => (
  <footer className="footer">
    <div className="footer-product__wrapper">
      <Link to="/mylist" activeStyle>
        <p className="footer-product">
          My products
          <img alt="list icon" src={mylist} width="30" height="30" />
        </p>
      </Link>
      <Link to="/addproduct/existing" activeStyle>
        <p className="footer-product">
          Add product
          <img alt="product icon" src={addproduct} width="30" height="30" />
        </p>
      </Link>
      {/* <Link to="/myprofile" activeStyle>
        <p className="footer-product">
          My profile
          <img alt="profile icon" src={myprofile} width="30" height="30" />
        </p>
      </Link> */}
    </div>
  </footer>
);
