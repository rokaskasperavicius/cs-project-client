import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { apiUrl } from "../../config";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [selectedSearch] = useState("");
  const [selectedOrderBy, setSelectedOrderBy] = useState("");
  //TODO: get possible orders from database, MP 08/05


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
        {products
          .filter((p) => p.expiryDate < new Date().addDays(5).toISOString())
          .map((p) => (
            <tr>
              <th>{p.name}</th>
              <th>{p.expiryDate.split("T")[0]}</th>
            </tr>
          ))}
      </div>
    </>
  );
};
