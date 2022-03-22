import { useEffect, useState } from "react";
import { Input } from "./components/Input";
import {Button} from "./components/Button";
import DropdownButton from "./components/DropdownButton";
import styles from "./styles/styles.module.css";
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


// http://getbem.com/introduction/

const App = () => {


    const handleChange = () => {
        console.log("CALL BACKEND IMMEDIATELY");
    };


  return (
    <div className="App">

        {/*<select onChange={(e) => setCategoryName(e.target.value)}>
        {data.map((value) => (
          <option value={value}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </option>
        ))}
      </select>*/}

            <Router>
                <Navbar />
            </Router>

            <h1>Website for food tracking</h1>

         <div>
            <Button
                className={styles.button}
                onClick={() => handleChange}>
                Add
            </Button>
        </div>

        <div>
            <Input
                className={styles.input}
                placeholder="Type product..."/>
        </div>

        <div>
            <Input
                className={styles.input}
                placeholder="Type expiration date..."/>
        </div>

        <div>
            <Input
                className={styles.input}
                placeholder="Type notes..."/>
        </div>

        <div>
            <DropdownButton
                placeholder= "Select Category"
                className={styles.dropdown}
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
