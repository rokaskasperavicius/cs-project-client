import React from "react";
import { Button } from "../../components/Button";
import DropdownButton from "../../components/DropdownButton";
import { Input } from "../../components/Input";
import styles from "../../styles/styles.module.css";

const handleChange = () => {
  console.log("CALL BACKEND IMMEDIATELY");
};

export const ExistingProduct = (
  <div className="page-content">
    <h2 className={styles.title}>Product</h2>

    <DropdownButton
      placeholder="Select Category"
      className={styles.dropdown}
      data={[
        { value: 1, label: "Food" },
        { value: 2, label: "Cosmetics" },
        { value: 3, label: "Medicine" },
      ]}
    ></DropdownButton>

    <DropdownButton
      placeholder="Select Subcategory"
      data={[
        { value: 1, label: "Vegetables" },
        { value: 2, label: "Meat" },
        { value: 3, label: "Fruit" },
      ]}
    ></DropdownButton>

    <Input className={styles.input} placeholder="Type expiration date..." />

    <Input className={styles.input} placeholder="Type notes..." />

    <Button className={styles.button} onClick={() => handleChange}>
      Add
    </Button>
  </div>
);
