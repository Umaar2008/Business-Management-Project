import { useContext, useState } from "react";
import EmployeesContext from "../Context/EmployeesContext";
import Button from './Button';
import { Link } from 'react-router-dom';
import Modal from '../Components/Modal';

function EmployeeShow({ Employee, OnShowModal, ShowButtons, ...rest }) {
    const { employees } = useContext(EmployeesContext);
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleMouseEnter = (e) => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4 transition duration-300 hover:shadow-lg"
        >
            <div
                {...rest}
                className="text-lg w-full flex justify-between items-center"
                key={Employee._id}
            >
                <div className="w-52 font-semibold text-gray-700">
                    Employee Name: <span className="text-gray-900">{Employee.EmployeeName}</span>
                </div>
                <div className="w-36 text-gray-700">
                    Employee Age: <span className="text-gray-900">{Employee.EmployeeAge}</span>
                </div>
                <div className="w-36 text-gray-700">
                    Gender: <span className="text-gray-900">{Employee.EmployeeGender}</span>
                </div>
            </div>

            {ShowButtons && isHovered && (
                <div className="flex gap-4 mt-4">
                    <Button standard hover secondary className="rounded-lg">
                        <Link to={`/admin/employees/edit/${Employee._id}`} >Edit</Link>
                    </Button>
                    <Button danger hover rounded onClick={handleClick}>
                        <Link to={`/admin/employees/${Employee._id}`}  >Delete</Link>
                    </Button>
                    {showModal && OnShowModal && (
                        <Modal EmployeeModal={true} Employee={Employee} />
                    )}
                </div>
            )}
        </div>
    );
}

export default EmployeeShow;
