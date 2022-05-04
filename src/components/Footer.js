import React from "react";
import {Link} from "react-router-dom";
import mylist from './Icons/mylist.svg';
import addproduct from './Icons/addproduct.svg';
//import myprofile from './Icons/myprofile.svg;';

export const Footer = () => (
  <footer className="footer">
    <div className="footer-product__wrapper">
      <p className="footer-product">My products
          <img src={mylist} width="30" height="30" fill='white' stroke='white'/>
          <Link to="/mylist" activeStyle></Link>
      </p>
      <p className="footer-product">Add product
          <img src={addproduct} width="30" height="30" fill='white' stroke='white'/>
          <Link to="/addproduct" activeStyle></Link>
      </p>
      <p className="footer-product">My profile
        <img src={addproduct} width="30" height="30" fill='white' stroke='white'/>
        <Link to="/myprofile" activeStyle></Link>
      </p>
    </div>
  </footer>
);
