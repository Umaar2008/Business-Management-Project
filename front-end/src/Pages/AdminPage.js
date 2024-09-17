import Sidebar from '../Components/Sidebar'
import ProductsList from '../Components/ProductsList';
import { useContext, useDeferredValue, useEffect, useState } from "react"
import ProductsContext from "../Context/ProductsContext"
import EmployeeContext from '../Context/EmployeesContext';
import Button from '../Components/Button';
import { Link , useNavigate } from "react-router-dom"

function AdminPage ({OnShowModal}) {

    const {fetchAdminProducts ,Products , LogoutAdmin} = useContext(ProductsContext)
    const {LogoutEmployee} = useContext(EmployeeContext)
    const navigate = useNavigate();
    useEffect(() => {
        fetchAdminProducts()
    }, [])

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

    return <div className='bg-gray-100 min-h-screen flex flex-col'>
        <div className='bg-white shadow-md border-b border-gray-200 py-4 px-6'>
            <div className="container mx-auto flex items-center justify-end">

        <Button danger rounded hover onClick={handleLogoutClick}> Logout </Button>
        <Button primary rounded hover  > <Link to="/admin/Add-products"> Add Products  </Link></Button>
            </div>
        </div>
        <div className='flex  w-full mt-20'>
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
        <div className='flex gap-14 w-full ml-10 '>

        <ProductsList OnShowModal={OnShowModal} ShowCategory={true} ShowButtons={true} ShowInput={false} products={Products}/>
        </div>


        </div>
        
        </div>

 }

 export default AdminPage;