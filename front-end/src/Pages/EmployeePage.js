import Sidebar from '../Components/Sidebar';
import EmployeeList from '../Components/EmployeeList';
import { useContext, useEffect } from "react";
import Button from '../Components/Button';
import { Link  , useNavigate} from "react-router-dom";
import EmployeesContext from '../Context/EmployeesContext';
import ProductsContext from "../Context/ProductsContext"
function EmployeePage({ OnShowModal }) {
    const { fetchEmployees, employees  , LogoutEmployee} = useContext(EmployeesContext);
    const { LogoutAdmin } = useContext(ProductsContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);


    const handleLogoutClick = async () => {
        try {
            await LogoutAdmin();
            localStorage.removeItem('token'); 
            await LogoutEmployee()
            localStorage.removeItem('EmployeeToken'); 
             navigate('/'); 
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
           
            <div className="bg-white shadow-md border-b border-gray-200 py-4 px-6">
                <div className="container mx-auto flex items-center justify-end">
                    <Button danger rounded hover onClick={handleLogoutClick}> Logout </Button>
                    <Button primary rounded hover>

                        <Link to="/admin/Add-employee" className="text-white">Add Employees</Link>
                    </Button>
                </div>
            </div>
            
            {/* Main Content Section */}
            <div className="flex flex-1 mt-14">
                {/* Sidebar */}
                <Sidebar className="w-64 bg-white shadow-lg">
                    <Button secondary rounded hover>
                        <Link to="/admin" className="text-gray-700">Edit Products</Link>
                    </Button>
                    <Button primary rounded hover>
                        <Link to="/admin/employees" className="text-white">Edit Employees</Link>
                    </Button>
                    <Button primary rounded hover>
                        <Link to="/admin/Sales" className="text-white">Sales</Link>
                    </Button>
                </Sidebar>
                
                {/* Employee List */}
                <div className="flex-1 ml-6">
                    <EmployeeList employees={employees} OnShowModal={OnShowModal} ShowButtons={true} />
                </div>
            </div>
        </div>
    );
}

export default EmployeePage;
