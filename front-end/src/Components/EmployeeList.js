
import EmployeeShow from "../Components/EmployeeShow"


function ProductsList ({employees   ,OnShowModal, ShowButtons, ...rest}) {

    const renderdEmployees = Array.isArray(employees) ? employees.map((Employee) => {
        return <EmployeeShow {...rest} OnShowModal={OnShowModal} ShowButtons={ShowButtons} key={Employee._id} Employee={Employee} />;
    }) : [];

    
  if (!employees || employees.length === 0) {
    return <p className="text-red-600">No Employees Made</p>;
  }

    return (
        <div className=" w-full " >
    {renderdEmployees}
</div>
    )
}

export default ProductsList ;