import React from "react";

import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => (
  <>
    <Nav>
      <NavLink to="/">
        <h1>CS Project</h1>
      </NavLink>
      <NavMenu>
        <NavLink to="/addproduct" activeStyle>
          Add product
        </NavLink>
        <NavLink to="/mylist" activeStyle>
          My products
        </NavLink>
        <NavLink to="/myprofile" activeStyle>
          My profile
        </NavLink>
      </NavMenu>
    </Nav>
  </>
);
export default Navbar;
