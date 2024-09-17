const Product = require('../Models/ProductModel')
const ProductSold = require('../Models/ProductSold')

const getProducts = async (req , res) => { //get the products 
    const product  = await Product.find()
    res.json(product)
}

const SellProducts = async (req , res) => {

    try {
        const { products } = req.body;  

        const updatePromises = products.map(async (productUpdate) => {
            const { productId, newStock } = productUpdate;
            return Product.findByIdAndUpdate(productId, { ProductStock: newStock }, { new: true });
        });

        await Promise.all(updatePromises);

        res.status(200).send('Stock updated for all products');
    } catch (error) {
        console.error("Error updating product stock:", error);
        res.status(500).send('Server error');
    }

}



const UpdateTotalProductSold = async (req, res) => {

    try {
        const { Name, TotalSold } = req.body;

      
        const productSold = await ProductSold.findOne({ Name });

        if (productSold) {
           
            productSold.TotalSold += TotalSold; 
            await productSold.save();  
            res.status(200).json({ message: "Total Sold updated successfully" });
        } else {
            
            const newProductSold = await ProductSold.create({
                Name,
                TotalSold
            });
            res.status(201).json({ message: "New product sold record created" });
        }

    } catch (error) {
        console.error("Error updating or creating total product sold:", error);
        res.status(500).send('Server error');
    }
}


const getProductSold = async (req , res) => { //get the products 
    const productSold  = await ProductSold.find()
    res.json(productSold)
}


module.exports = {getProducts , SellProducts  , UpdateTotalProductSold , getProductSold  }