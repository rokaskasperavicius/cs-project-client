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
    <div className="App" style={{ height: "100vh" }}>
      {/* {data.map((value) => (
        <div>{value}</div>
      ))} */}
      <iframe
        title="test"
        src="https://files.crazygames.com/ludo-king/1/index.html"
        allow="autoplay; fullscreen; microphone; clipboard-read; clipboard-write"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        msallowfullscreen="true"
        allowfullscreen="true"
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-presentation allow-scripts allow-same-origin"
        style={{ width: "100%", height: "100%" }}
        // style="border: 0px; background-color: rgb(255, 255, 255); width: 10px; height: 10px; min-width: 100%; min-height: 100%;"
      ></iframe>
      {/* <input p text="My Button" /> */}
    </div>
  );
};

export default App;
