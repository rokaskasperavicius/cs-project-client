import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { AddButton } from "./components/AddButton";
import DropdownButton from "./components/DropdownButton";



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

      <AddButton onClick={() => handleChange}>Add</AddButton>

        <div>
            <Input placeholder="Type product..."/>
        </div>

        <div>
            <Input placeholder="Type expiration date..."/>
        </div>

        <div>
            <Input placeholder="Type notes..."/>
        </div>

        {/* WORKING ON IT
        <div>
            <DropdownButton> data={[
                {value: 1, label: "Food"},
                {value: 2, label: "Cosmetics"},
                {value: 3, label: "Medicine"},
            ]}
                placeholder= "Select category"
                onChange={handleChange}
            </DropdownButton>
        </div>


      {/* {data.map((value) => (
        <div>{value}</div>
      ))}
      <input placeholder="" />
      <Button text="My Button" /> */}
    </div>
  );
};

export default App;
