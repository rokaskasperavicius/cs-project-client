import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import orderBy from "lodash/orderBy";
//import deleteIcon from "/.../icons/trash.svg"

import DropdownButton from "../../components/DropdownButton";
import SortButton from "../../components/SortButton";
import sorticon from "../../assets/icons/sorticon.svg";
import { InputSearch } from "../../components/inputSearch";
import { apiUrl } from "../../config";
import {Button} from "../../components";
import mylist from "../../assets/icons/mylist.svg";

export const MyList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [selectedOrderBy, setSelectedOrderBy] = useState("");
  //const [name, setName] = useState("");
  //const [expiryDate, setExpiryDate] = useState("");


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
    // Fail quick
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

  useEffect(() => {
    const newOrder = selectedOrderBy || "name";
    setProducts(orderBy(products, [newOrder]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrderBy]);

  useEffect(() => {
    // fail check
    const parametersArray = [];

    if (selectedSubcategory) {
      parametersArray.push("filter=" + encodeURIComponent(selectedSubcategory));
    }

    if (debouncedSearch) {
      parametersArray.push("search=" + encodeURIComponent(debouncedSearch));
    }

    const endpoint = "/products?" + parametersArray.join("&");

    fetch(apiUrl + endpoint)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setProducts(res.data);
          setSelectedOrderBy("");
        }
      });
  }, [debouncedSearch, selectedSubcategory]);

    const handleDelete = () => {

        // Generate the body necessary for BE
        const body = {
            name: products.name,
            expiryDate: products.expiryDate,
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
                // If BE inserted the product, reset the form
                if (res.success) {
                    setProducts(res.data)
                }
            }, );
    };
/*<Button onClick={}
                  image={<img alt="delete icon" src={deleteIcon} width="30" height="30">} >
          </Button>*/
  return (
    <>
      <h3 className="title">My products</h3>
      <div className="filter__wrapper">
        <InputSearch
          value={selectedSearch}
          onChange={setSelectedSearch}
          placeholder="Search for product..."
        />
               
       
        
        <label>or select category</label>
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
          value={selectedOrderBy}
          onChange={setSelectedOrderBy}
          data={orderByOptions.map((c) => ({
            value: c.value,
            label: c.label,
          }))}
        />
      </div>
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
          {products
            .map((p) => (
              <tr>
                <th>{p.name}</th>
                <th>{p.note}</th>
                <th>{p.expiryDate.split("T")[0]}</th>
                  <Button onClick={handleDelete()}>Delete</Button>
              </tr>
            ))}
        </tbody>
      </table>
      
      <div className="mobile-view">
        {products.map((p) => (
          <div className="mobile-view__product">
            <p><strong>Name: </strong> {p.name}</p>
            <p><strong>Note: </strong> {p.note}</p>
            <p><strong>Expiry date: </strong> {p.expiryDate.split("T")[0]}</p>
              <Button onClick={handleDelete()}>Delete</Button>
          </div>
        ))}
      </div>
    </>
  );
};
