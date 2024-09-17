import Button from '../Components/Button';
import { useContext, useEffect, useState } from 'react';
import ProductsContext from '../Context/ProductsContext';
import DropDown from '../Components/DropDown';
import { useParams, Link } from 'react-router-dom';

function ProductEdit() {
  const options = [
    { label: 'Clothing, Shoes & Accessories', value: 'Clothing, Shoes & Accessories' },
    { label: 'Baby', value: 'Baby' },
    { label: 'Food', value: 'Food' },
    { label: 'Sweets', value: 'Sweets' },
    { label: 'Toys', value: 'Toys' },
    { label: 'Home, Furniture & Appliances', value: 'Home, Furniture & Appliances' },
    { label: 'Patio & Garden', value: 'Patio & Garden' },
    { label: 'Home Improvement', value: 'Home Improvement' },
    { label: 'Video Games', value: 'Video Games' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Pharmacy, Health & Wellness', value: 'Pharmacy, Health & Wellness' },
    { label: 'Personal Care', value: 'Personal Care' },
  ];

  const { id } = useParams();
  const { Products, editProductbyId } = useContext(ProductsContext);
  
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    const filteredProduct = Products.find((product) => product._id === id);
    
    if (filteredProduct) {
      setProductName(filteredProduct.ProductName);
      setProductPrice(filteredProduct.ProductPrice);
      setProductStock(filteredProduct.ProductStock);
      setSelection(options.find((option) => option.value === filteredProduct.ProductCategory));
    }
  }, [id, Products]);

  const handleSelect = (option) => setSelection(option);
  const handleProductNameChange = (e) => setProductName(e.target.value);
  const handleProductPriceChange = (e) => setProductPrice(e.target.value);
  const handleProductStockChange = (e) => setProductStock(e.target.value);

  const handleClick = (e) => {
    e.preventDefault();
    editProductbyId(id, productName, productPrice, productStock, selection.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-10 rounded-lg shadow-lg w-2/3 max-w-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Edit Product</h2>
        
        <div className="flex flex-col gap-6 mb-6">
          <input
            onChange={handleProductNameChange}
            value={productName}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Product Name"
            required
          />
          <input
            onChange={handleProductPriceChange}
            value={productPrice}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Product Price"
            required
          />
          <input
            onChange={handleProductStockChange}
            value={productStock}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Product Stock"
            required
          />
        </div>
        
        <div className="mb-6">
          <DropDown options={options} value={selection} onChange={handleSelect} className="w-full border-2 border-gray-300 rounded-md" />
        </div>
        
        <Button
          success
          hover
          onClick={handleClick}
          className="ml-44 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          <Link to="/admin">Save</Link>
        </Button>
      </form>
    </div>
  );
}

export default ProductEdit;
