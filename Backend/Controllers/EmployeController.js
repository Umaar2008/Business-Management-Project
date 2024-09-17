const Product = require('../Models/ProductModel')
const Employee = require('../Models/EmployeModel')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
var jwt = require('jsonwebtoken');



const GetEmployees = asyncHandler(async(req ,res) => {
  
    const employees = await Employee.find();
        
    if (employees.length === 0) {
    } else {
        res.status(200).json(employees);
    }})


const UpdateEmployees = asyncHandler(async(req ,res) => {
    const {id} = req.params;
        const {EmployeeName , EmployeePassword ,EmployeeAge , EmployeeGender} = req.body;
        const hashedPassword = await bcrypt.hash(EmployeePassword , 10)
        const updatedEmployee = await Employee.findByIdAndUpdate(id , {
            EmployeeName ,
            EmployeePassword : hashedPassword ,
            EmployeeAge,
            EmployeeGender
        } , { new: true, runValidators: true })
        if(!updatedEmployee) {
            res.status(404)
            throw new Error (`Employee with ID ${id} wasn't updated`)
        }
        res.status(200).json(updatedEmployee)
})

const CreateEmployees = asyncHandler(async(req ,res) => {

    const {EmployeeName , EmployeeGender , EmployeeAge , EmployeePassword} = req.body
    if (!EmployeeName || !EmployeeGender || !EmployeeAge || !EmployeePassword ) {
        res.status(400)
        throw new Error ('All Fields Are Mandatory to create a Employee')
    }
    const hashedPassword = await bcrypt.hash(EmployeePassword , 10)
    const employee = await Employee.create({
        EmployeeName ,
        EmployeePassword : hashedPassword ,
        EmployeeGender,
        EmployeeAge
    })
    res.status(201).json({message : "Employee Created"})
});


const DeleteEmployees = asyncHandler(async(req ,res) => {
    const {id} = req.params 
        
    const DeleteEmployee = await Employee.findOneAndDelete(id)

    if(!DeleteEmployee) {
        res.status(404)
        throw new Error (`product with ID ${id}`)
    }
    else {
        res.status(200).json(`product with the ID ${id} has been deleted` )
    }
})


const LoginEmployee = asyncHandler(async (req, res) => {
    const { EmployeeName, EmployeePassword } = req.body;
    const employee = await Employee.findOne({ EmployeeName });

    if (employee && (await bcrypt.compare(EmployeePassword, employee.EmployeePassword))) {
        const accessToken = jwt.sign(
            {
                employee: {
                    EmployeeName: employee.EmployeeName
                }
            },
            "umar123",
            { expiresIn: '1h' }
        );
        res.cookie("EmployeeToken", accessToken, { httpOnly: true }); 
        res.status(200).json({ accessToken }); 
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

const LogoutEmployee = (req, res) => {
    res.cookie('EmployeeToken', '', { 
      httpOnly: true, 
      expires: new Date(0), 
      secure: true, 
      sameSite: 'Strict' 
    });
    
    return res.status(200).json({ message: 'Logout successful' });
  };
  
module.exports =  { UpdateEmployees, CreateEmployees , DeleteEmployees ,GetEmployees , LoginEmployee , LogoutEmployee}