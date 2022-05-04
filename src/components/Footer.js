import React from "react";
import {Link} from "react-router-dom";

export const Footer = () => (
  <footer className="footer">
    <div className="footer-product__wrapper">
      <p className="footer-product">My products</p>
        <Link to="/mylist" activeStyle></Link>
      <p className="footer-product">Add product</p>
        <Link to="/addproduct" activeStyle></Link>
      <p className="footer-product">My profile</p>
        <p to="/myprofile" activeStyle></p>
    </div>
  </footer>
);
