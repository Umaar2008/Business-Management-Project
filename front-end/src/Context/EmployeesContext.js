import { createContext, useState } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();


function Provider({ children }) {

    const [employees , setEmployees] = useState([]);




    const fetchEmployees = async () => {
        const token = localStorage.getItem('EmployeeToken'); 
        const response = await axios.get('http://localhost:5000/employee', {
          headers: {
            Authorization: `Bearer ${token}` 
          },
          withCredentials: true ,
          required:true ,
        });
        setEmployees(response.data);
      };
     
        


  const AddEmployee = async (EmployeeName, EmployeeAge, EmployeeGender , EmployeePassword) => {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/employee', {
      EmployeeName,
      EmployeeAge,
      EmployeePassword,
      EmployeeGender,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true ,
      required:true ,
    });

    const newEmployee = response.data;
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
  };
  const EditEmployeeById = async (_id, newEmployeeName, newEmployeeAge, newEmployeePassword, newEmployeeGender) => {
    const token = localStorage.getItem('token'); 
    const response = await axios.put(
      `http://localhost:5000/employee/${_id}`,
      { 
        EmployeeName: newEmployeeName,
        EmployeeAge: newEmployeeAge,
        EmployeePassword: newEmployeePassword,
        EmployeeGender: newEmployeeGender
      },
      { 
        headers: {
          Authorization: `Bearer ${token}` 
        },
        withCredentials: true ,
        required:true ,
      }
    );

    const updatedEmployees = employees.map((Employee) => {
        if (Employee._id === _id) {
          return { ...Employee, ...response.data };
        }
        return Employee;
      });
      setEmployees(updatedEmployees);


  }

      const DeleteEmployee = async (_id) => {
        const token = localStorage.getItem('token'); 
        const response = await axios.delete(`http://localhost:5000/employee/${_id}`, {
          headers: {
            Authorization: `Bearer ${token}` 
          },
          withCredentials: true ,
          required:true ,
        });
    
        const updatedEmployee = employees.filter((product) => product._id !== _id);
        setEmployees(updatedEmployee);
      }

      const LogoutEmployee = async () => {
        const EmployeeToken = localStorage.getItem('EmployeeToken'); 

        try {
          await axios.post('http://localhost:5000/employee/Logout', {}, {
            headers: {
              Authorization: `Bearer ${EmployeeToken}` 
            },
            withCredentials: true ,
            required:true ,
        });
      
          localStorage.removeItem('EmployeeToken');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };
  
    


    const valuetoshare = {
fetchEmployees ,
EditEmployeeById,
AddEmployee,
DeleteEmployee,
employees ,
LogoutEmployee
    }
return (
    <EmployeeContext.Provider value={valuetoshare}>
      {children}
    </EmployeeContext.Provider>
  );
}

export { Provider };
export default EmployeeContext;