import { useState, useContext } from "react";
import DropDown from "../Components/DropDown";
import Button from "../Components/Button";
import EmployeeContext from "../Context/EmployeesContext";
import { useNavigate } from "react-router-dom";

function AddEmployeePage() {
  const navigate = useNavigate();
  const options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const { AddEmployee } = useContext(EmployeeContext);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeAge, setEmployeeAge] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [selection, setSelection] = useState(null);
  const [error, setError] = useState(null);


  const handleSelect = (option) => {
    setSelection(option);
  };

  const handleEmployeeNameChange = (e) => {
    setEmployeeName(e.target.value);
  };

  const handleEmployeeAgeChange = (e) => {
    setEmployeeAge(e.target.value);
  };

  const handleEmployeePasswordChange = (e) => {
    setEmployeePassword(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if(!employeeName || !employeeAge || !selection || !employeePassword){
        setError("All fields are mandatory to be filled")
    }
    else {

        AddEmployee(employeeName, employeeAge, selection.value, employeePassword);
        navigate("/admin/employees");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Add New Employee
        </h2>

        <div className="flex flex-col gap-6 mb-6">
          <input
            onChange={handleEmployeeNameChange}
            value={employeeName}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Employee Name"
            required
          />
          <input
            onChange={handleEmployeeAgeChange}
            value={employeeAge}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            placeholder="Employee Age"
            required
          />
          <input
            onChange={handleEmployeePasswordChange}
            value={employeePassword}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Employee Password"
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
          success
          hover
          onClick={handleClick}
          className="ml-36 py-2 rounded-md text-white font-semibold bg-green-600 hover:bg-green-700 transition duration-300"
        >
          Save
        </Button>
        {error && <p className="text-red-500 font-bold text-center mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default AddEmployeePage;
