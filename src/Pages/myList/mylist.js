import React, { useEffect, useState } from "react";


const productsMock = {
  success: true,
  data: [
    {
      id: 14,
      name: "carrots",
      note: "These are really good",
      expiryDate: "2022-03-05T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
    {
      id: 34,
      name: "potatoes",
      note: "Insert a note here",
      expiryDate: "2022-06-15T00:00:00.000Z",
    },
  ],
};

export const MyList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productsMock.success) {
      setProducts(productsMock.data);
    }
  }, []);

  console.log(products);

  return (
    <>
      <h3 className="title">My list</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Note</th>
            <th>Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr>
              <th>{p.id}</th>
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
