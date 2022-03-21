import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import {Button} from "./components/Button";
import DropdownButton from "./components/DropdownButton";
import "./styles/main.css";


// http://getbem.com/introduction/

const App = () => {


    const [name, setName] = useState("");

    const handleChange = () => {
        console.log("CALL BACKEND IMMEDIATELY");
    };

    useEffect(() => {
        handleChange();
    }, [name]);


  return (
    <div className="App">

        {/*<select onChange={(e) => setCategoryName(e.target.value)}>
        {data.map((value) => (
          <option value={value}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </option>
        ))}
      </select>*/}

         <div>
            <Button onClick={() => handleChange}>Add</Button>
        </div>

        <div>
            <Input placeholder="Type product..."/>
        </div>

        <div>
            <Input placeholder="Type expiration date..."/>
        </div>

        <div>
            <Input placeholder="Type notes..."/>
        </div>

        <div>
            <DropdownButton
                placeholder= "Select Category"
                onChange={(e) => setName(e.target.value)}
                data={[
                    {value: 1, label: "Food"},
                    {value: 2, label: "Cosmetics"},
                    {value: 3, label: "Medicine"},
                ]}>
            </DropdownButton>
        </div>

        <div>
            <DropdownButton
                placeholder= "Select Subcategory"
                onChange={(e) => setName(e.target.value)}
                data={[
                    {value: 1, label: "Vegetables"},
                    {value: 2, label: "Meat"},
                    {value: 3, label: "Fruit"},
                ]}>
            </DropdownButton>
        </div>

    </div>
  );
};

export default App;
