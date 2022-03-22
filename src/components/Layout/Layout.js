 import React from "react";
 import style from './Layout.css'

export const Layout = ({ children }) => (
  <main id={style.layout}>
<div id={ style.pageContent }>
   <div id={ style.mainContent }>
 { children }
 </div>
 </div>
  </main>
    
  
    
);
