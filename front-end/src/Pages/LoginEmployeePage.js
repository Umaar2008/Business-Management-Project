import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import ProductsContext from "../Context/ProductsContext";

function LoginEmployeePage() {
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeePassword, setEmployeePassword] = useState("");
  const [error, setError] = useState(null);
  const { LoginEmployee } = useContext(ProductsContext);
  const navigate = useNavigate();

  const handleEmployeeChange = (event) => {
    setEmployeeName(event.target.value);
  };

  const handlePassChange = (event) => {
    setEmployeePassword(event.target.value);
  };

  const handleClick = async () => {
    setError(null);
    try {
      await LoginEmployee(EmployeeName, EmployeePassword);
      navigate("/products");
    } catch (error) {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl text-white font-semibold mb-8 text-center">Employee Login</h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <input
              onChange={handleEmployeeChange}
              value={EmployeeName}
              className="w-full p-3 rounded-md border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Employee Name"
              type="text"
              required
            />
          </div>
          <div>
            <input
              onChange={handlePassChange}
              value={EmployeePassword}
              className="w-full p-3 rounded-md border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              type="password"
              required
            />
          </div>
          <div className="flex justify-center">
            <Button primary hover rounded onClick={handleClick} className=" py-2">
              Login
            </Button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginEmployeePage;
