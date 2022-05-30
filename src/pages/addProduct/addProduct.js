import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import DropdownButton from "../../components/DropdownButton";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { apiUrl } from "../../config";
import {toast} from "react-toastify";

export const ExistingProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [expiryDate, setExpiryDate] = useState("");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [errors, setErrors] = useState(false);

    const updateName = (name) => {
        if (!name) {
            setErrors({
                ...errors,
                name: "Field is required",
            });
        } else if (name.length > 95) {
            setErrors({
                ...errors,
                name: "Field is too long",
            });
        } else {
            delete errors["name"];
            setErrors(errors);
        }

        setName(name);
    };
    const updateCategories= (selectedCategory) => {
        if (!selectedCategory) {
            setErrors({
                ...errors,
                selectedCategory: "Category required",
            });
        } else {
            delete errors["selectedCategory"];
            setErrors(errors);
        }

        setSelectedCategory(selectedCategory);
    };
    const updateSubcategories= (selectedSubCategory) => {
        if (!selectedSubCategory) {
            setErrors({
                ...errors,
                selectedSubCategory: "Subcategory required",
            });
        } else {
            delete errors["selectedSubCategory"];
            setErrors(errors);
        }

        setSelectedSubCategory(selectedSubCategory);
    };
    const updateCalendar= (expiryDate) => {
        if (!expiryDate) {
            setErrors({
                ...errors,
                expiryDate: "Date required",
            });
        } else {
            delete errors["expiryDate"];
            setErrors(errors);
        }

        setExpiryDate(expiryDate);
    };

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
      toast("Product is added", {toastId: "addproduct-add-success"});
      console.log(expiryDate, name);
      return;
    // Fail quick
    if (!(expiryDate && name && selectedSubCategory)) {
        //toast("Missing product name, subcategory or expiry date", {toastId: "addproduct-missing-success"});
      return;

    }
    // If the selected expiry date is in the past, fail the form submission
    if (new Date(expiryDate) < new Date()) {
        //toast("Expiry date in the past", {toastId: "addproduct-past-success"});
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

        <div>
            <Input
                value={name}
                onChange={updateName}
                placeholder="Type product name..."
                />
            <p className="name__error">{errors["name"]}</p>
        </div>

        <div>
            <DropdownButton
                placeholder="Select Category"
                value={selectedCategory}
                onChange={updateCategories}
                data={categories.map((c) => ({
                    value: c.name,
                    label: c.name,
                }))}
            />
            <p className="categories__error">{errors["selectedCategory"]}</p>
        </div>

        {selectedCategory && (
        <div>
            <DropdownButton
                placeholder="Select Subcategory"
                value={selectedSubCategory}
                onChange={updateSubcategories}
                data={subCategories.map((c) => ({
                    value: c.name,
                    label: c.name,
                }))}
            />
            <p className="subcategories__error">{errors["selectedSubCategory"]}</p>
        </div>)}

        <div>
            <Input value={expiryDate}
                   onChange={updateCalendar}
                   type="date" />
            <p className="calendar__error">{errors["expiryDate"]}</p>
        </div>

      <TextArea value={note} onChange={setNote} placeholder="Type notes..." />

      <Button onClick={handleSubmit}>Add</Button>
    </>
  );
};
