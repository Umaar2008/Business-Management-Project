import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import ProductsContext from "../Context/ProductsContext";

function Checkout({ productDetails, totalPrice, onCheckout }) {
  const { fetchProducts, TotalProductSold } = useContext(ProductsContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (Object.keys(productDetails).length > 0) {
      const productArray = Object.entries(productDetails).map(([productId, product]) => ({
        name: product.name,
        quantity: product.quantity,
      }));
      setProducts(productArray);
    }
  }, [productDetails]);

  const handleClick = () => {
    onCheckout();
    products.forEach(product => {
      TotalProductSold(product.name, product.quantity);
    });
    window.location.reload();
  };

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-72 p-4 bg-orange-500 text-black border-2 border-gray-300 rounded-t-lg shadow-lg z-50">
      <div className="font-semibold text-lg mb-2">Checkout Summary</div>
      <ul className="list-disc list-inside mb-2">
        {Object.entries(productDetails).map(
          ([productId, { name, price, productprice, quantity }], index) => (
            <li key={productId} className="mb-1">
              <span className="font-bold">{index + 1}:</span> {name}: ${productprice.toFixed(2)} x {quantity}
            </li>
          )
        )}
      </ul>
      <div className="font-bold text-xl mb-4">Total: ${totalPrice.toFixed(2)}</div>
      <div className="flex gap-4">

        <Button primary rounded hover className="flex-1" onClick={handleClick}>
        Checkout
        </Button>
      </div>
    </div>
  );
}

export default Checkout;
