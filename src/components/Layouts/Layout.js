import React from "react";
import { Header } from "../Header.js";
import { Footer } from "../Footer.js";


export const Layout = ({ children }) => (
  <div className="layout">

      <Header/>
    <main className="page-content">
      <div className="main-content">{children}</div>
    </main>

    <Footer />
  </div>
);
