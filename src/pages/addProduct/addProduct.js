import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import DropdownButton from "../../components/DropdownButton";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { apiUrl } from "../../config";

export const ExistingProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [expiryDate, setExpiryDate] = useState("");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [errors, setErrors] = useState(false);

  useEffect(() => {
    if (name.length > 90) {
      setErrors({
        ...errors,
        name: "Date should be in the future",
      });
    } else {
      setErrors({
        ...errors,
        name: false,
      });
    }
  }, [name]);

  useEffect(() => {
    // Fetching all categories
    fetch(apiUrl + "/categories")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Set new categories
          setCategories(res.data);
        }
      });

    /**
     * The second parameter (empty array) ensures that the useEffect calls
     * the function only once - when the page first mounts
     */
  }, []);

  useEffect(() => {
    // Fail quick
    if (!selectedCategory) {
      return;
    }

    // Fetch all category's subcategories
    fetch(apiUrl + "/categories/subcategories?categoryName=" + selectedCategory)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Reset selected subcategory
          setSelectedSubCategory("");

          // Set new subcategories
          setSubCategories(res.data);
        }
      });

    /**
     * The second parameter (selectedCategory) ensures that the useEffect calls
     * the function only when selectedCategory changes
     */
  }, [selectedCategory]);

  // Controller
  const handleSubmit = () => {
    // Fail quick
    if (!(expiryDate && name && selectedSubCategory)) {
      return;
    }

    // If the selected expiry date is in the past, fail the form submission
    if (new Date(expiryDate) < new Date()) {
      return;
    }

    // Generate the body necessary for BE
    const body = {
      name,
      subCategoryName: selectedSubCategory,
      note: note || undefined,
      expiryDate: new Date(expiryDate).toISOString(),
    };

    // Post the product
    fetch(apiUrl + "/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        // If BE inserted the product, reset the form
        if (res.success) {
          setName("");
          setNote("");
          setSelectedSubCategory("");
          setExpiryDate("");
        }

        if (!res?.success && res?.errorCode === 2) {
          console.log("PRODUCT ALREADY EXISTS");
        } else {
          console.error("Something went wrong");
        }
      });
  };

  return (
    <>
      <h3 className="title">Add product</h3>

      <div className="add-product__wrapper">
        <Input
          className={errors["name"] ? " error" : ""}
          value={name}
          onChange={setName}
          placeholder="Type product name..."
        />

        <DropdownButton
          placeholder="Select Category"
          value={selectedCategory}
          onChange={setSelectedCategory}
          data={categories.map((c) => ({
            value: c.name,
            label: c.name,
          }))}
        />

        <DropdownButton
          placeholder="Select Subcategory"
          value={selectedSubCategory}
          onChange={setSelectedSubCategory}
          data={subCategories.map((c) => ({
            value: c.name,
            label: c.name,
          }))}
        />

        <Input
          value={expiryDate}
          onChange={setExpiryDate}
          type="date"
          placeholder="yasudasd"
        />

        <TextArea value={note} onChange={setNote} placeholder="Type notes..." />

        <Button onClick={handleSubmit}>Add</Button>
      </div>
    </>
  );
};
