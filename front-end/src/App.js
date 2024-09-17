import LandingPage from "./Pages/LandingPage"
import AdminPage from "./Pages/AdminPage";
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import EmployeePage from "./Pages/EmployeePage"
import ProductEditPage from "./Pages/ProductEditPage";
import AddProductsPage from "./Pages/AddProdcutsPage";
import LoginAdminPage from "./Pages/LoginAdminPage";
import AddEmployeePage from "./Pages/AddEmployeePage";
import EditEmployeePage from "./Pages/EditEmployeePage"
import LoginEmployeePage from "./Pages/LoginEmployeePage"
import SalesPage from "./Pages/SalesPage";
function App() {
  
  return <Router><div>
<Routes>
  <Route exact path="/" element={<LoginEmployeePage />}/>
  <Route exact path="/products" element={<LandingPage />}/>
  
  

  <Route exact path="/admin/login" element={<LoginAdminPage/>}/>
  <Route exact path="/admin" element={<AdminPage OnShowModal={false}/>}/>


  <Route exact path="/admin/edit/:id" element={<ProductEditPage/>}/>

  <Route exact path="/admin/:id" element={  <AdminPage OnShowModal={true}/>}/>

  <Route exact path="/admin/Add-products" element={<AddProductsPage />}/> 
  <Route exact path="/admin/employees" element={<EmployeePage />}/>
  <Route exact path="/admin/employees/:id" element={<EmployeePage OnShowModal={true}/>}/>
  <Route exact path="/admin/employees/edit/:id" element={<EditEmployeePage />}/>
  <Route exact path="/admin/Sales" element={<SalesPage />}/>


  <Route exact path="/admin/Add-employee" element={<AddEmployeePage />}/>

</Routes>

  </div></Router> 
}

export default App;
