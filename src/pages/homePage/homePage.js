import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { apiUrl } from "../../config";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedSearch] = useState("");
  const [selectedOrderBy, setSelectedOrderBy] = useState("");

  const [debouncedSearch] = useDebounce(selectedSearch, 300);

  console.log(products);

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

  return (
    <>
      <h2 className="title">Welcome</h2>
      <div className="box">
        <h3>Products expiring soon</h3>
        <div className="box__wrapper">
          {products
            .filter((p) => p.expiryDate < new Date().addDays(5).toISOString())
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
