import { createContext, useState } from 'react';
import axios from 'axios';

const ProductsContext = createContext();

function Provider({ children }) {
  const [Products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [SoldProducts , setSoldProducts] = useState([])

  
  
  const LoginEmployee = async (EmployeeName, EmployeePassword) => {
     
    try {
      const response = await axios.post('http://localhost:5000/employee/Login', {
        EmployeeName,
        EmployeePassword
      }, { withCredentials: true });
      
      const token = response.data.accessToken;
      
      if (token) {
        localStorage.setItem('EmployeeToken', token);
      } 
    } catch(err) {
      console.log("there is an err" , err)
    }
  };


  const LoginAdmin = async (AdminName, AdminPassword) => {
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/admin/LoginAdmin', {
        AdminName,
        AdminPassword
      }, { withCredentials: true });
      
      const token = response.data.accessToken;
      
      if (token) {
        localStorage.setItem('token', token);
      }
    } catch (err) {
      setError('Failed to login');
    }
  };

  const fetchProducts = async () => {
    const Employeetoken = localStorage.getItem('EmployeeToken'); 

    const response = await axios.get(`http://localhost:5000/products`, {
      headers: {
        Authorization: `Bearer ${Employeetoken}` 
      },
      withCredentials: true });
    setProducts(response.data); 
  };  

  const fetchAdminProducts = async () => {
    const token = localStorage.getItem('token'); 
    const response = await axios.get('http://localhost:5000/admin/product', {
      headers: {
        Authorization: `Bearer ${token}` 
      },
      withCredentials: true
    });
    setProducts(response.data);
  };

  const editProductbyId = async (_id, NewProductName, NewProductPrice, NewProductStock, NewProductCategory) => {
    const token = localStorage.getItem('token'); 
    const response = await axios.put(
      `http://localhost:5000/admin/product/${_id}`,
      { 
        ProductName: NewProductName,
        ProductPrice: NewProductPrice,
        ProductStock: NewProductStock,
        ProductCategory: NewProductCategory
      },
      { 
        headers: {
          Authorization: `Bearer ${token}` 
        },
        withCredentials: true
      }
    );


    const updatedProducts = Products.map((product) => {
      if (product._id === _id) {
        return { ...product, ...response.data };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  
  const AddProduct = async (ProductName, ProductPrice, ProductStock, ProductCategory) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const response = await axios.post('http://localhost:5000/admin/product', {
      ProductName,
      ProductPrice,
      ProductStock,
      ProductCategory
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });

    const newProduct = response.data;
    const updatedProducts = [...Products, newProduct];
    setProducts(updatedProducts);
  };



  const LogoutAdmin = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5000/admin/Logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true ,
        require : true ,
      } , 
    
    );
  
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const TotalProductSold = async (Name , TotalSold) => {
    const EmployeeToken = localStorage.getItem('EmployeeToken'); 

    const response = await axios.post('http://localhost:5000/products/Sold', {
      Name,
      TotalSold
    } ,
    {
      headers: {
        Authorization: `Bearer ${EmployeeToken}`
      },
      withCredentials: true ,
      require:true ,
    }
  );
  }

  const getProductSold = async () => {
    const token = localStorage.getItem('token');

    const response = await axios.get('http://localhost:5000/products/Sold' ,  {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true ,
      require:true ,
    })
    setSoldProducts(response.data)
  }

   
  const DeleteProduct = async (_id) => {
    const token = localStorage.getItem('token'); 

    try {
        const response = await axios.delete(`http://localhost:5000/admin/product/${_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        });

        if (response.status === 200) {
            setProducts((prevProducts) => 
                prevProducts.filter((product) => product._id !== _id)
            );
        } else {
            console.error('Failed to delete the product:', response.data);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

  const valuetoshare = {
    LogoutAdmin,
    fetchProducts,
    LoginAdmin,
    editProductbyId,
    AddProduct,
    fetchAdminProducts,
    Products,
    DeleteProduct ,
    LoginEmployee ,
    TotalProductSold ,
    getProductSold,
    SoldProducts ,
    
  };

  return (
    <ProductsContext.Provider value={valuetoshare}>
      {children}
    </ProductsContext.Provider>
  );
}

export { Provider };
export default ProductsContext;
