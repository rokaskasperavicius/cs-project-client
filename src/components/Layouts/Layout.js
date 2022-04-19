import React from "react";

import Navbar from "../Navbar";
import { Footer } from "../Footer.js";
import { Header } from "../Header.js";

export const Layout = ({ children }) => (
  <div className="layout">
    <Navbar />

    <main className="page-content">
      <div className="main-content">{children}</div>
    </main>
    <Header/>

    <Footer />
  </div>
);
