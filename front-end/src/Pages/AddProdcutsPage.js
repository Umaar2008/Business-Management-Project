import { useState, useContext } from "react";
import DropDown from "../Components/DropDown";
import Button from '../Components/Button';
import ProductsContext from "../Context/ProductsContext";
import { useNavigate } from 'react-router-dom'; 

function AddProductsPage() {
    const navigate = useNavigate();
    const options = [
        { label: 'Clothing, Shoes & Accessories', value: 'Clothing, Shoes & Accessories' },
        { label: 'Baby', value: 'Baby' },
        { label: 'Toys', value: 'Toys' },
        { label: 'Food', value: 'Food' },
    { label: 'Sweets', value: 'Sweets' },
        { label: 'Home, Furniture & Appliances', value: 'Home, Furniture & Appliances' },
        { label: 'Patio & Garden', value: 'Patio & Garden' },
        { label: 'Home Improvement', value: 'Home Improvement' },
        { label: 'Video Games', value: 'Video Games' },
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Pharmacy, Health & Wellness', value: 'Pharmacy, Health & Wellness' },
        { label: 'Personal Care', value: 'Personal Care' },
    ];

    const { AddProduct } = useContext(ProductsContext);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productStock, setProductStock] = useState("");
    const [selection, setSelection] = useState(null);
    const [error, setError] = useState(null);

    const handleSelect = (option) => setSelection(option);
    const handleProductNameChange = (e) => setProductName(e.target.value);
    const handleProductPriceChange = (e) => setProductPrice(e.target.value);
    const handleProductStockChange = (e) => setProductStock(e.target.value);
    const handleClick = (e) => {
        e.preventDefault();
        if(!productName || !productPrice || !productStock || !selection){
                setError("Please fill all the fields");
        }
        else {

            AddProduct(
                productName,
                productPrice,
                productStock,
                selection.value,
                navigate('/admin')
            );
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="bg-white p-10 rounded-lg shadow-lg w-2/3 max-w-xl">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Add New Product</h2>
                <div className="flex flex-col gap-6 mb-6">
                    <input 
                        onChange={handleProductNameChange} 
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        type="text" 
                        placeholder="Product Name" 
                        required
                    />
                    <input 
                        onChange={handleProductPriceChange} 
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        type="number" 
                        placeholder="Product Price" 
                        required
                    />
                    <input 
                        onChange={handleProductStockChange} 
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        type="number" 
                        placeholder="Product Stock" 
                        required
                    />
                </div>
                <div className="mb-6">
                    <DropDown 
                        options={options} 
                        value={selection} 
                        onChange={handleSelect} 
                        className="w-full border-2 border-gray-300 rounded-md"
                    />
                </div>
                <Button 
                       success hover 
                    className="ml-44 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300" 
                    onClick={handleClick}
                >
                    Save
                 </Button>

                 {error && <p className="text-red-500 font-bold text-center mt-2">{error}</p>}
                 </form>
        </div>
    );
}

export default AddProductsPage;
