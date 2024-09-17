const express = require("express");
const router = express.Router()

const { UpdateEmployees, CreateEmployees , DeleteEmployees ,GetEmployees , LoginEmployee , LogoutEmployee  } = require("../Controllers/EmployeController")
const {SellProducts} = require("../Controllers/ProductController")


const isLoggedIn = require('../Middlewares/CheckIsLoggedIn')
const isEmployeeLoggedIn = require("../Middlewares/CheckIsEmployeeLoggedIn")

router.route( "/"  ).get(isLoggedIn , GetEmployees)
router.route( "/" ).post( isLoggedIn ,CreateEmployees)
router.route('/Login').post(LoginEmployee)
router.route('/Logout').post(isEmployeeLoggedIn ,LogoutEmployee)
router.route( "/sell" ).put(isEmployeeLoggedIn,SellProducts)

router.route( "/:id"   ).put(isLoggedIn , UpdateEmployees)
router.route( "/:id"  ).delete(isLoggedIn ,DeleteEmployees)

module.exports = router;