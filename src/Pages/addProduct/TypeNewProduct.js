import React from "react";
import { Input } from "../../components/Input";
import styles from "../../styles/styles.module.css";

export const TypeNewProduct = (
  <div className="page-content">
    <h3 className={styles.title}>Type your product!</h3>
    <Input className={styles.input} placeholder="Type product..." />
    
  </div>
);
