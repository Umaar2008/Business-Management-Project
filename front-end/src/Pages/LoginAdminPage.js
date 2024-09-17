import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import ProductsContext from "../Context/ProductsContext";

function LoginAdminPage() {
  const [AdminName, setAdminName] = useState('');
  const [AdminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState(null); // To track login errors
  const { LoginAdmin } = useContext(ProductsContext);
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleAdminChange = (event) => {
    setAdminName(event.target.value);
  };

  const handlePassChange = (event) => {
    setAdminPassword(event.target.value);
  };

  const handleClick = async () => {
    setError(null); // Clear any previous errors
    try {
      await LoginAdmin(AdminName, AdminPassword); // Await the login process
      navigate("/admin"); // Navigate to the admin page after successful login
    } catch (error) {
      setError("Invalid credentials. Please try again."); // Set an error message
    }
  };

  return (
    <div className="bg-gray-900 flex flex-col w-screen h-screen justify-center items-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Admin Login</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleClick(); }}>
          <div className="flex flex-col gap-4">
            <input
              onChange={handleAdminChange}
              value={AdminName}
              className="p-4 rounded-md border-2 border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Admin Name"
              type="text"
            />
            <input
              onChange={handlePassChange}
              value={AdminPassword}
              className="p-4 rounded-md border-2 border-gray-600 bg-gray-700 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Password"
              type="password"
            />
            <Button 
              primary 
              hover 
               
              className=" rounded-md  ml-32 mt-4"
              onClick={handleClick}
            >
              Login
            </Button>
          </div>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>} 
      </div>
    </div>
  );
}

export default LoginAdminPage;
