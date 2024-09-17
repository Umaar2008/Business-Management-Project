const express = require("express");
const router = express.Router()
const { getProducts , createProducts, LogoutAdmin, editProducts,  deleteProducts , CreateAdmin , LoginAdmin} = require("../Controllers/AdminController")
const isLoggedIn = require('../Middlewares/CheckIsLoggedIn')

router.route( "/product"  ).get(isLoggedIn , getProducts)
router.route( "/product" ).post(isLoggedIn ,createProducts)
router.route( "/product/:id"   ).put(isLoggedIn ,editProducts)
router.route( "/product/:id"  ).delete(isLoggedIn ,deleteProducts)
// router.route( "/create/idktheroute" ).post(CreateAdmin) ===> development puposes only 
router.route( "/LoginAdmin" ).post(LoginAdmin)
router.route("/Logout").post(isLoggedIn ,LogoutAdmin)

module.exports = router