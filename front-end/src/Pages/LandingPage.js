import SearchBar from "../Components/SearchBar"
import Sidebar from "../Components/Sidebar";
import Button  from "../Components/Button";
import { FaSearch } from "react-icons/fa";
import { Link , useNavigate } from "react-router-dom"
import ProductsList from "../Components/ProductsList"
import { useEffect , useState } from "react";
import { useContext } from "react"
import ProductsContext from "../Context/ProductsContext"
import EmployeeContext from "../Context/EmployeesContext";
import Checkout from "../Components/Checkout";


function LandingPage () {
const {fetchProducts ,Products } = useContext(ProductsContext)
const {LogoutEmployee} = useContext(EmployeeContext)
const navigate = useNavigate();
const [searchproducts , setsearchProducts] = useState('')

const handleSearch = (searchValue) => {
    const filteredProducts = Products.filter((product) =>
      product.ProductName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setsearchProducts(filteredProducts );
  };
    

    useEffect(() => {
        fetchProducts();
      }, [] );

      useEffect(() => {
        setsearchProducts(Products); 
      }, [Products]);
 
      const handleLogoutClick = async () => {
        try {
            await LogoutEmployee();
            localStorage.removeItem('EmployeeToken'); 
            navigate('/'); 
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return <div className="">
        <div className=" ml-96 flex items-center justify-between   ">
        <div>
        <SearchBar onSearch={handleSearch}  /> 

        </div>
        <div className="flex">

        <Button danger rounded hover onClick={handleLogoutClick}> Logout </Button>
        <Button secondary hover rounded> <Link to="/admin/login"> Admin Panel </Link></Button>

        </div>

        </div>
        <div className="flex ">
        <Sidebar></Sidebar>
        <div className="m-10 w-full"> 
       <ProductsList ShowCheckOut={true} ShowInput={true} products={searchproducts}/>

        </div>
        </div>
        <div>

        </div>

    </div>
}
export default LandingPage ;