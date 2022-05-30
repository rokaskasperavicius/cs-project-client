import React, { useEffect, useState } from "react";

// Config
import { apiUrl } from "../../config";

export const HomePage = () => {
  const [products, setProducts] = useState([]);

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

  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const foodProducts = products.filter((p) => p.categoryName === "Food");
  const medCosProducts = products.filter((p) => p.categoryName !== "Food");

  console.log(foodProducts, medCosProducts);

  return (
    <>
      <h2 className="title">Welcome</h2>
      <div className="box">
        <h3>Products expiring soon</h3>
        <div className="box__wrapper">
          <div>Food</div>
          {foodProducts
            .filter((p) => p.expiryDate <= new Date().addDays(1).toISOString())
            .map((p) => (
              <div>
                <span>{p.name}</span>
                <span>{p.expiryDate.split("T")[0]}</span>
              </div>
            ))}
          <div>Medicine and Cosmetics</div>
          {medCosProducts
            .filter((p) => p.expiryDate <= new Date().addDays(30).toISOString())
            .map((p) => (
              <div>
                <span>{p.name}</span>
                <span>{p.expiryDate.split("T")[0]}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
