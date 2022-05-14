import { Routes, Route } from "react-router-dom";
import { ExistingProduct } from "./Pages/addProduct/ExistingProduct";
import { Layout } from "./components/Layouts";
import { MyList } from "./Pages/myList/mylist";
import { MyProfile } from "./Pages/myProfile/myProfile";
import { HomePage } from "./Pages/homePage/homePage";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/addproduct" element={<ExistingProduct/>}/>
                <Route path="/myproducts" element={<MyList/>}/>
                <Route path="/myprofile" element={MyProfile}/>
                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
// // http://getbem.com/introduction/

// const App = () => {

const handleChange = () => {
  console.log("CALL BACKEND IMMEDIATELY");
};


