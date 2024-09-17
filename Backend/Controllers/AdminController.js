        const Product = require('../Models/ProductModel')
        const Admin = require('../Models/AdminModel')
        const bcrypt = require('bcrypt')
        const asyncHandler = require('express-async-handler')
        var jwt = require('jsonwebtoken');

        const getProducts = asyncHandler(async (req, res) => {
            const products = await Product.find();
        
            if (products.length === 0) {
           
            } else {
                res.status(200).json(products);
            }
        });


        const CreateAdmin = asyncHandler (async(req , res) => {
            const {AdminName , AdminPassword} = req.body
            if (!AdminName || !AdminPassword) {
                res.status(400)
                throw new Error ('All Fields Are Mandatory to create a Admin')
            }
            const hashedPassword = await bcrypt.hash(AdminPassword , 10)
            const admin = await Admin.create({
                AdminName ,
                AdminPassword : hashedPassword ,
            })
            res.status(201).json({message : "Admin Created"})
        })




        const createProducts = asyncHandler( async (req , res) => {  
            const { ProductName , ProductPrice , ProductStock , ProductCategory} = req.body
            if (!ProductName || !ProductPrice || !ProductStock || !ProductCategory) {
            } 
            const product = await Product.create({
                    ProductName ,
                    ProductPrice,
                    ProductStock,
                    ProductCategory
                })  
                product.createdAt = new Date();

            res.status(201).json({message: "Product created" })
        }
        )

        const LoginAdmin = asyncHandler(async (req, res) => {
            const { AdminName, AdminPassword } = req.body;
            const admin = await Admin.findOne({ AdminName });
        
            if (admin && (await bcrypt.compare(AdminPassword, admin.AdminPassword))) {
                const accessToken = jwt.sign(
                    {
                        admin: {
                            AdminName: admin.AdminName
                        }
                    },
                    "umar123",
                    { expiresIn: '1h' }
                );
                res.cookie("token", accessToken, { httpOnly: true }); // Set token as cookie
                res.status(200).json({ accessToken }); // Send token in response body if needed
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        });


        const editProducts = asyncHandler( async (req , res) => {  //Edit Products on admin panel
        const {id} = req.params;
        const {ProductName , ProductPrice , ProductStock , ProductCategory} = req.body;

        const updatedProducts = await Product.findByIdAndUpdate(id , {
            ProductName ,
            ProductPrice ,
            ProductStock,
            ProductCategory
        } , { new: true, runValidators: true })
        if(!updatedProducts) {
            res.status(404)
            throw new Error (`product with ID ${id}`)
        }
        res.status(200).json(updatedProducts)
        })

        const deleteProducts = asyncHandler ( async (req , res) => { 
            const {id} = req.params 
        
            const DeleteProduct = await Product.findOneAndDelete(id)

            if(!DeleteProduct) {
                res.status(404)
                throw new Error (`product with ID ${id}`)
            }
            else {
                res.status(200).json(`product with the ID ${id} has been deleted` )
            }
        }) 


        const LogoutAdmin = (req, res) => {
            res.cookie('token', '', { 
              httpOnly: true, 
              expires: new Date(0),
              secure: true, 
              sameSite: 'Strict'
            });
            
            return res.status(200).json({ message: 'Logout successful' });
          };
          

        module.exports = { getProducts , createProducts,  editProducts,  deleteProducts , LogoutAdmin , CreateAdmin , LoginAdmin }