import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layoyut from "./Component/Layout/Layoyut";
import Dashborad from "./Pages/Dashboard/Dashborad";
import ProductList from "./Pages/ProductList/ProductList";
import CreateProduct from "./Pages/createProdcut/CreateProduct";
import Profile from "./Pages/Profile/Profile";
import Recive from "./Pages/Recive/Recive";
import DailyMonthSall from "./Pages/Daily Sall & Month/DailyMonthSall";
import ProductID from "./Pages/ProductList/ProductID/ProductID";
import Cart from "./Pages/Cart/Cart";
import { useState } from "react";
import Table from "./Admin/Table";
import Update from "./Admin/Update/Update";
import Selles from "./Pages/Selling/Selles";

function App() {
const [cart,setCart]=useState([])



  return (
    <div className="">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layoyut cart={cart} setCart={setCart}/>}>
        <Route path="/" element={<Dashborad/>} />
        <Route path="/productList" element={<ProductList cart={cart} setCart={setCart}/>} />
        <Route path="/createProduct" element={<CreateProduct/>} />
        <Route path="/receipt" element={<Recive/>} />
        <Route path="/selles" element={<Selles/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/dailySales" element={<DailyMonthSall/>} />
        <Route path="/product/:id" element={<ProductID cart={cart} setCart={setCart}/>} />
        <Route path="/table-list" element={<Table/>} />
        <Route path="/update/:id" element={<Update/>} />

        {/* <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} /> */}
        


        </Route>

      </Routes>
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;
