import ReactDOM from 'react-dom';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import ProductsContext from "../Context/ProductsContext";
import { useParams } from 'react-router-dom';
import EmployeeContext from '../Context/EmployeesContext';

function Modal({ Product, ProductModal, EmployeeModal, Employee }) {
  const navigate = useNavigate();
  const { DeleteProduct } = useContext(ProductsContext);
  const { DeleteEmployee } = useContext(EmployeeContext);
  const { id } = useParams();

  const handleClick = () => {
    if (ProductModal === true) {
  

      DeleteProduct(id);
      navigate("/admin");
    } else if (EmployeeModal === true) {
      console.log("Deleting employee with ID:", id);
      DeleteEmployee(id);
      navigate("/admin/employees");
    }
  };

  useEffect(() => {}, []);

  const handleNoClick = () => {
    if (ProductModal === true) {
      navigate("/admin");
    } else if (EmployeeModal === true) {
      navigate("/admin/employees");
    }
  };

  return ReactDOM.createPortal(
    <div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative z-50">
          <div className="mt-4 text-center">
            {ProductModal && (
              <div className="text-xl font-semibold text-gray-800">
                Are you sure you want to delete the product "{Product.ProductName}"?
              </div>
            )}
            {EmployeeModal && (
              <div className="text-xl font-semibold text-gray-800">
                Are you sure you want to delete the employee "{Employee.EmployeeName}"?
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <Button danger rounded hover onClick={handleClick} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
              Yes, I am sure
            </Button>
            <Button primary hover rounded onClick={handleNoClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
              No, cancel
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container')
  );
}

export default Modal;
