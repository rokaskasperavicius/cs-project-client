import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import orderBy from "lodash/orderBy";
import TrashIcon from "../../assets/icons/trash.svg";

import DropdownButton from "../../components/DropdownButton";
import SortButton from "../../components/SortButton";
import { InputSearch } from "../../components/inputSearch";
import { apiUrl } from "../../config";

export const MyList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [selectedOrderBy, setSelectedOrderBy] = useState("name");

  const [isLoading, setIsLoading] = useState(false);

  const orderByOptions = [
    { label: "Name", value: "name" },
    { label: "Note", value: "note" },
    { label: "Expiry", value: "expiryDate" },
  ];

  const [debouncedSearch] = useDebounce(selectedSearch, 300);

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
  }, []);

  useEffect(() => {
    // If the selectedCategory doesn't exists, remove the selected subCategory and quit the method
    if (!selectedCategory) {
      setSelectedSubcategory("");
      return;
    }

    // Fetch all category's subcategories
    fetch(apiUrl + "/categories/subcategories?categoryName=" + selectedCategory)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setSubCategories(res.data);
        }
      });
  }, [selectedCategory]);

  // This method handles fetching products with optional queries
  const fetchProducts = () => {
    const parametersArray = [];

    if (selectedSubcategory) {
      parametersArray.push("filter=" + encodeURIComponent(selectedSubcategory));
    }

    if (debouncedSearch) {
      parametersArray.push("search=" + encodeURIComponent(debouncedSearch));
    }

    const endpoint = "/products?" + parametersArray.join("&");
    setIsLoading(true);
    fetch(apiUrl + endpoint)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // Order the new product list
          setProducts(orderBy(res.data, [selectedOrderBy]));
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, selectedSubcategory]);

  const handleDelete = (product) => {
    // Generate the body necessary for BE
    const body = {
      name: product.name,
      expiryDate: product.expiryDate,
    };

    // Delete the product
    fetch(apiUrl + "/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        // When the product id deleted, fetch the updated products list
        if (res.success) {
          fetchProducts();
        }
      });
  };

  return (
    <>
      <h3 className="title">My products</h3>
      <div className="filter__wrapper">
        <InputSearch
          value={selectedSearch}
          onChange={setSelectedSearch}
          placeholder="Search for product..."
        />

        <label className="filter__separator">or select category</label>
        <DropdownButton
          placeholder="Category"
          aria-label="ff"
          value={selectedCategory}
          onChange={setSelectedCategory}
          data={categories.map((c) => ({
            value: c.name,
            label: c.name,
          }))}
        />
        {selectedCategory && (
          <DropdownButton
            placeholder="*Subcategory"
            value={selectedSubcategory}
            onChange={setSelectedSubcategory}
            data={subCategories.map((c) => ({
              value: c.name,
              label: c.name,
            }))}
          />
        )}
        <SortButton
          placeholder=""
          disableEmptyValue={true}
          value={selectedOrderBy}
          onChange={(value) => {
            setSelectedOrderBy(value);

            // Order the product list with the new selected order
            setProducts(orderBy(products, [value]));
          }}
          data={orderByOptions.map((c) => ({
            value: c.value,
            label: c.label,
          }))}
        />
      </div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <table className="desktop-view">
          <thead>
            <tr>
              <th>Name</th>
              <th>Note</th>
              <th>Expiry Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr>
                <th>{p.name}</th>
                <th>{p.note}</th>
                <th>{p.expiryDate.split("T")[0]}</th>
                <th onClick={() => handleDelete(p)}>
                  <img src={TrashIcon} width={30} alt="Trash icon" />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mobile-view">
        {products.map((p) => (
          <div className="mobile-view__product">
            <p>
              <strong>Name: </strong> {p.name}
            </p>
            <p>
              <strong>Note: </strong> {p.note}
            </p>
            <p>
              <strong>Expiry date: </strong> {p.expiryDate.split("T")[0]}
              <a onClick={() => handleDelete(p)}>
                <img src={TrashIcon} width={20} alt="Trash icon" />{" "}
              </a>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
