import { useState } from 'react';
import ProductShow from "../Components/ProductShow";
import Checkout from './Checkout';  
import { useContext } from "react"
import ProductsContext from "../Context/ProductsContext"
import axios from 'axios';

function ProductsList({ products, ShowCheckOut, ShowInput, ShowCategory, OnShowModal, ShowButtons, ...rest }) {
    const { fetchProducts ,TotalProductSold  } = useContext(ProductsContext);
    
    const [productDetails, setProductDetails] = useState({});
    const [productQuantities, setProductQuantities] = useState({});

    const handleProductChange = (productId, productName, productQuantity , ProductPrice ,productTotalPrice) => {
        setProductDetails((prevDetails) => {
            const updatedDetails = {
                ...prevDetails,
                [productId]: { name: productName, price: productTotalPrice , productprice:ProductPrice, quantity : productQuantity}, // Update name and price of the product
            };

            setProductQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: productQuantity, 
            }));
        
            return updatedDetails;  
        });
    };

    const handleCheckout = async () => {
        try {
         
            const updates = Object.keys(productQuantities).map(productId => {
                const selectedProduct = products.find(product => product._id === productId);

                return {
                    productId,
                    newStock: selectedProduct.ProductStock - productQuantities[productId]
                };
            });
            const EmployeeToken = localStorage.getItem('EmployeeToken');    
            await axios.put(`http://localhost:5000/employee/sell`, {
                products: updates  
            }, {
                headers: {
                    Authorization: `Bearer ${EmployeeToken}`
                },
                withCredentials: true
            }
        
        );

        } catch (error) {
            console.error("Error during checkout: ", error);
            alert('Checkout failed');
        }
    };

   
    const renderedProducts = Array.isArray(products) ? products.map((Product) => {
        return (
            <ProductShow 
                {...rest} 
                ShowCheckOut={ShowCheckOut} 
                ShowButtons={ShowButtons} 
                ShowCategory={ShowCategory}
                OnShowModal={OnShowModal} 
                ShowInput={ShowInput} 
                key={Product._id} 
                Product={Product} 
                onProductChange={handleProductChange}  
            />
        );
    }) : [];
    
    const totalPrice = Object.values(productDetails).reduce((acc, { price }) => acc + price, 0);
    
    if (!products || products.length === 0) {
        return <p className="text-red-600">No Products Made</p>;
      }

    return (
        <div className="w-full">
            {renderedProducts}
            {ShowCheckOut && (
                <Checkout productDetails={productDetails} totalPrice={totalPrice} onCheckout={handleCheckout} />
            )}
        </div>
    );
}

export default ProductsList;
