import Sales from "../Components/Sales"
import Button from "../Components/Button";
import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
function SalesPage () {
    return (
        <div className="flex  w-full h-full">
            <div className="w-64 flex-1 mt-36">

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
            </div>
            <div className="w-full h-full">

            <Sales />
            </div>
        </div>
    )
}
export default SalesPage;