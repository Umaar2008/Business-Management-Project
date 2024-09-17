import { useState } from "react";
import Button from './Button';
import { Link } from 'react-router-dom';
import Modal from '../Components/Modal';

function ProductShow({ Product, ShowInput, ShowCheckOut, ShowCategory, OnShowModal, ShowButtons, ...rest }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(0); 
    const [totalPrice, setTotalPrice] = useState(0);  

    const handleClick = () => {
        setShowModal(true);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleChange = (e) => {
        const newQuantity = parseInt(e.target.value, 10) || 0;
        setQuantity(newQuantity);

        const updatedTotalPrice = Number(Product.ProductPrice) * newQuantity;
        setTotalPrice(updatedTotalPrice);  

        if (rest.onProductChange) {
            rest.onProductChange(Product._id, Product.ProductName, newQuantity , Product.ProductPrice , updatedTotalPrice);
        }
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`w-full border-2 rounded-lg ${isHovered ? 'border-blue-500' : 'border-gray-300'} transition-colors duration-300 ease-in-out`}
        >
            <div
                {...rest}
                className="text-lg flex gap-8 items-center p-4 bg-gray-100 rounded-t-lg shadow-md"
                key={Product._id}
            >
                <div className="w-1/4 font-semibold text-gray-700 truncate">
                    {Product.ProductName}
                </div>
                <div className="w-1/4 text-gray-600">${Product.ProductPrice}</div>
                <div className="w-1/4 text-gray-600">{Product.ProductStock}</div>
                <div className="w-1/4 flex gap-4 items-center">
                    {ShowCategory && (
                        <div className="text-gray-500">{Product.ProductCategory}</div>
                    )}
                    {ShowInput && (
                        <input
                            onChange={handleChange}
                            className="w-20 px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            min={0}
                            value={quantity}
                        />
                    )}
                </div>
            </div>
            {ShowButtons && isHovered && (
                <div className="flex p-4 bg-gray-50 rounded-b-lg shadow-md">
                    <Button standard hover secondary className="rounded-lg">
                        <Link to={`/admin/edit/${Product._id}`} className="block text-center">Edit</Link>
                    </Button>
                    <Button danger hover rounded className="rounded-lg">
                        <Link to={`/admin/${Product._id}`} className="block text-center" onClick={handleClick}>Delete</Link>
                    </Button>
                    {showModal && OnShowModal && (
                        <Modal ProductModal={true} Product={Product} />
                    )}
                </div>
            )}
        </div>
    );
}

export default ProductShow;
