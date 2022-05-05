import React from "react";
import { Header } from "../Header.js";
import { Footer } from "../Footer.js";

export const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    <main className="page-content">{children}</main>
    <Footer />
  </div>
);
