import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layoyut from "./Component/Layout/Layoyut";
import Dashborad from "./Pages/Dashboard/Dashborad";
import ProductList from "./Pages/ProductList/ProductList";
import CreateProduct from "./Pages/createProdcut/CreateProduct";
import Profile from "./Pages/Profile/Profile";
import Recive from "./Pages/Recive/Recive";
import DailyMonthSall from "./Pages/Daily Sall & Month/DailyMonthSall";

function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layoyut/>}>
        <Route path="/dashboard" element={<Dashborad/>} />
        <Route path="/productList" element={<ProductList/>} />
        <Route path="/createProduct" element={<CreateProduct/>} />
        <Route path="/receive" element={<Recive/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/dailySales" element={<DailyMonthSall/>} />


        </Route>

      </Routes>
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;
