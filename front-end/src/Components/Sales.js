import { Bar } from "react-chartjs-2";
import { useContext, useEffect } from "react";
import ProductsContext from "../Context/ProductsContext";
import moment from 'moment'; 

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


function Sales() {
  const { getProductSold, SoldProducts } = useContext(ProductsContext);

  useEffect(() => {
    getProductSold();
  }, []); 


  if (!SoldProducts || SoldProducts.length === 0) {
    return <p className="text-red-700 text-center text-3xl mt-44 mr-10 font-semibold">Loading sales data...</p>;
  }


  const colors = SoldProducts.map(() => getRandomColor());

  return (
    <div>
      <div> 
        <Bar
          data={{
            labels: SoldProducts.map(
              (product) => `${product.Name}`
            ),
            datasets: [
              {
                label: "Sales",
                data: SoldProducts.map((product) => product.TotalSold),
                backgroundColor: colors, 
                borderColor: colors, 
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Product Sales",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Sales;
