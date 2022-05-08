import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.module.css";
import DropdownButton from "../../components/DropdownButton";
import {Input} from "../../components/Input";
import {apiUrl} from "../../config";


export const MyList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSearch, setSelectedSearch] = useState("");
  const [selectedOrderBy, setSelectedOrderBy] = useState("");
  //TODO: get possible orders from database, MP 08/05
  const orderBy = ["name","note","expiry"];

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
        // Fetching all products
        fetch(apiUrl + "/products")
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    // Set new categories
                    setProducts(res.data);
                }
            });
  }, []);

    useEffect(() => {
        // fail check
        if (!selectedSubcategory && !selectedSearch && !orderBy) {
            return;
        }
        const parametersArray = [];
        if (selectedSubcategory) {
            //TODO: allow filtering by category, MP 08/05
            parametersArray.push("filter=" + selectedSubcategory)
        }
        if (selectedOrderBy) {
            parametersArray.push("orderby=" + selectedOrderBy)
        }
        if (selectedSearch) {
            parametersArray.push("search=" + selectedSearch)
        }
        const endpoint = "/products?" + parametersArray.join('&');

        fetch(apiUrl + endpoint)
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    setProducts(res.data);
                }
            })
    },[selectedSearch, selectedSubcategory, selectedOrderBy])


  return (
    <>
      <h3 className={styles.title}>My list</h3>
        <Input
            value={selectedSearch}
            onChange={setSelectedSearch}
            placeholder="Search for product..."
        />
        <DropdownButton
            placeholder="Select Category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            className={styles.dropdown}
            data={categories.map((c) => ({
                value: c.name,
                label: c.name,
            }))}
        />

        <DropdownButton
            placeholder="Select Subcategory"
            value={selectedSubcategory}
            onChange={setSelectedSubcategory}
            data={subCategories.map((c) => ({
                value: c.name,
                label: c.name,
            }))}
        />
        <DropdownButton
            placeholder="Order By"
            value={selectedOrderBy}
            onChange={setSelectedOrderBy}
            data={orderBy.map((c) => ({
                value: c,
                label: c,
            }))}
        />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Note</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr>
              <th>{p.name}</th>
              <th>{p.note}</th>
              <th>{p.expiryDate}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
