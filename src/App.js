import { useEffect, useState } from "react";
import { Button } from "./components";
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { Input } from "./components/Input";

// const data = ["ve", "stuff"];

const data = ["foods", "medicine"];

const sub_categories = {
  category1: ["Vegeatables", "Food"],
};
// http://getbem.com/introduction/

const App = () => {
  const [categoryName, setCategoryName] = useState("");
  // console.log(categoryName);

  // // useEffect(() => {
  // //   fetch("http://localhost:5000/test")
  // //     .then((res) => res.json())
  // //     .then((data) => console.log(data));

  // fetch("http://localhost:5000/test", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // }, []);

  const handleChange = () => {
    console.log("CALL BACKEND IMMEDIATELY");
  };

  const handleNewChange = function () {};

  useEffect(() => {
    handleChange();
  }, [categoryName]);

  return (
    <div className="App">
        <Router>
            <Navbar />
        </Router>
      <h1>Website for food tracking</h1>


      <div>
        <label htmlFor="test">Name:</label>
        <Input placeholder="Enter name..." />
      </div>

      <div>
        <label>Expiration:</label>
        <Input placeholder="Enter name..." />
      </div>

      <label>Choose a category:</label>

      <select onChange={(e) => setCategoryName(e.target.value)}>
        {data.map((value) => (
          <option value={value}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </option>
        ))}
      </select>

      <button onClick={() => handleChange}>Add product</button>

      {/* {data.map((value) => (
        <div>{value}</div>
      ))}
      <input placeholder="" />
      <Button text="My Button" /> */}
    </div>
  );
};

export default App;
