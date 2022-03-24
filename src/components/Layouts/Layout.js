import React from "react";

import Navbar from "../Navbar";
import { Footer } from "../Footer.js";

export const Layout = ({ children }) => (
  <div className="layout">
    <Navbar />

    <main className="page-content">
      <div className="main-content">{children}</div>
    </main>

    <Footer />
  </div>
);
