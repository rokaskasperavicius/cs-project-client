import { useEffect } from "react";
import { Button } from "./components";

const data = ["ve", "stuff"];

// http://getbem.com/introduction/

const App = () => {
  console.log(data);

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

  return (
    <div className="App">
      {data.map((value) => (
        <div>{value}</div>
      ))}
      <input placeholder="" />
      <Button text="My Button" />
    </div>
  );
};

export default App;
