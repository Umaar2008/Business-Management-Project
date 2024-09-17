import Button from '../Components/Button';
import { useContext, useEffect, useState } from "react";
import EmployeesContext from "../Context/EmployeesContext";
import DropDown from "../Components/DropDown";
import { useParams, Link } from 'react-router-dom';

function EditEmployeePage() {
    const options = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    const { id } = useParams();
    const { employees, EditEmployeeById } = useContext(EmployeesContext);
    const [employeeName, setEmployeeName] = useState("");
    const [employeeAge, setEmployeeAge] = useState("");
    const [employeePassword, setEmployeePassword] = useState("");
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        const filteredEmployee = employees.find((employee) => employee._id === id);

        if (filteredEmployee) {
            setEmployeeName(filteredEmployee.EmployeeName);
            setEmployeeAge(filteredEmployee.EmployeeAge);
            setEmployeePassword(filteredEmployee.EmployeePassword);
            setSelection(options.find((option) => option.value === filteredEmployee.EmployeeGender));
        }
    }, [id, employees]);

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
        EditEmployeeById(id,
            employeeName,
            employeeAge,
            employeePassword,
            selection.value,
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen flex justify-center items-center p-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Employee</h1>
                <form className="flex flex-col gap-6">
                    <input
                        onChange={handleEmployeeNameChange}
                        value={employeeName}
                        className="p-4 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type='text'
                        placeholder='Employee Name'
                    />
                    <input
                        onChange={handleEmployeeAgeChange}
                        value={employeeAge}
                        className="p-4 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type='number'
                        placeholder='Employee Age'
                    />
                    <input
                        onChange={handleEmployeePasswordChange}
                        className="p-4 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type='password'
                        placeholder='Employee Password'
                    />
                    <DropDown
                        options={options}
                        value={selection}
                        onChange={handleSelect}
                        className="border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        success
                        hover
                        onClick={handleClick}
                        className="ml-44 rounded-xl mt-4"
                    >
                       <Link to="/admin/employees">Save</Link>
                    </Button>
                </form>
               
            </div>
        </div>
    );
}

export default EditEmployeePage;
