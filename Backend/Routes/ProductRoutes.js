const express = require("express");
const router = express.Router()
const {getProducts  ,getProductSold, UpdateTotalProductSold , DeleteProductSoldData} = require('../Controllers/ProductController')
const isEmployeeLoggedIn = require('../Middlewares/CheckIsEmployeeLoggedIn')
const isLoggedIn  = require("../Middlewares/CheckIsLoggedIn")



router.route( "/products" ).get(isEmployeeLoggedIn,getProducts)
router.route( "/products/Sold" ).post(isEmployeeLoggedIn ,UpdateTotalProductSold)
router.route( "/products/Sold" ).get(isLoggedIn ,getProductSold)





module.exports = router