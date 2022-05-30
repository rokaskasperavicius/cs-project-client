import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "../../components/Button";
import DropdownButton from "../../components/DropdownButton";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { apiUrl } from "../../config";
import { toast } from "react-toastify";

export const ExistingProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const category = watch("category");

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

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
    if (!category) {
      return;
    }
    // Fetch all category's subcategories
    fetch(apiUrl + "/categories/subcategories?categoryName=" + category)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Set new subcategories
          setSubCategories(res.data);
        }
      });

    /**
     * The second parameter (selectedCategory) ensures that the useEffect calls
     * the function only when selectedCategory changes
     */
  }, [category]);

  // Controller
  const onSubmit = async ({ name, subCategory, expiryDate, note }) => {
    // Generate the body necessary for BE
    const body = {
      name,
      subCategoryName: subCategory,
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
          reset();

          toast("Product was added", { toastId: "addproduct-add-success" });
        }

        if (!res?.success) {
          if (res?.errorCode === 2) {
            toast("Product already exists", { toastId: "addproduct-add-fail" });
          } else {
            toast("Something went wrong", { toastId: "addproduct-add-fail" });
          }
        }
      });
  };

  return (
    <>
      <h3 className="title">Add product</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            {...register("name", {
              required: "Name is required",
              maxLength: { value: 90, message: "Name is too long" },
            })}
            placeholder="Type product name..."
          />
          <p className="error-field">{errors["name"]?.message}</p>
        </div>

        <div>
          <DropdownButton
            {...register("category", {
              required: "Category is required",
            })}
            placeholder="Select category"
            options={categories}
          />
          <p className="error-field">{errors["category"]?.message}</p>
        </div>

        {category && (
          <div>
            <DropdownButton
              {...register("subCategory", {
                required: "Category is required",
              })}
              placeholder="Select subcategory"
              options={subCategories}
            />
            <p className="error-field">{errors["subCategory"]?.message}</p>
          </div>
        )}

        <div>
          <Input
            type="date"
            {...register("expiryDate", {
              required: "Expiry date is required",
              validate: (date) =>
                new Date(date) > new Date() ||
                "Expiry date must be in the future",
            })}
          />
          <p className="error-field">{errors["expiryDate"]?.message}</p>
        </div>

        <div>
          <TextArea
            {...register("note", {
              maxLength: { value: 900, message: "Note is too long" },
            })}
            placeholder="Type notes..."
          />
          <p className="error-field">{errors["note"]?.message}</p>
        </div>

        <Button disabled={isSubmitting} onClick={handleSubmit}>
          Add
        </Button>
      </form>
    </>
  );
};
