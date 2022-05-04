import { Routes, Route } from "react-router-dom";

import { TypeNewProduct } from "./Pages/addProduct/TypeNewProduct";
import { ExistingProduct } from "./Pages/addProduct/ExistingProduct";
import { UnknownProduct } from "./Pages/addProduct/UnknownProduct";

import { Layout } from "./components/Layouts";
import { MyList } from "./Pages/myList/mylist";
import {MyProfile} from "./Pages/myProfile/myProfile";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/addproduct" element={TypeNewProduct} />
        <Route path="/addproduct/existing" element={ExistingProduct} />
        <Route path="/addproduct/unknown" element={UnknownProduct} />
        <Route path="/mylist" element={MyList} />
        <Route path="/myprofile" element={MyProfile} />

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

//   return (
//     <div className="App">

//         {/*<select onChange={(e) => setCategoryName(e.target.value)}>
//         {data.map((value) => (
//           <option value={value}>
//             {value.charAt(0).toUpperCase() + value.slice(1)}
//           </option>
//         ))}
//       </select>*/}

//             <h3>Page "Type new product" </h3>

//          <div>
// <Button
//     className={styles.button}
//     onClick={() => handleChange}>
//     Add
// </Button>
//         </div>

//         <div>
//             <Input
//                 className={styles.input}
//                 placeholder="Type product..."/>
//         </div>

//         <div>
//             <Input
//                 className={styles.input}
//                 placeholder="Type expiration date..."/>
//         </div>

//         <div>
//             <Input
//                 className={styles.input}
//                 placeholder="Type notes..."/>
//         </div>

//         <div>
//             <DropdownButton
//                 placeholder= "Select Category"
//                 className={styles.dropdown}
//                 data={[
//                     {value: 1, label: "Food"},
//                     {value: 2, label: "Cosmetics"},
//                     {value: 3, label: "Medicine"},
//                 ]}>

//             </DropdownButton>
//         </div>

//         <div>
//             <DropdownButton
//                 placeholder= "Select Subcategory"
//                 data={[
//                     {value: 1, label: "Vegetables"},
//                     {value: 2, label: "Meat"},
//                     {value: 3, label: "Fruit"},
//                 ]}>
//             </DropdownButton>
//         </div>

//     </div>
//   );
// };

// export default App;
