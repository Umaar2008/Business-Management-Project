    const mongoose = require("mongoose")

    const ProductSoldSchema = new mongoose.Schema({
    Name : {
            type : String,
            required : true ,

        } ,
        TotalSold : {
        type : Number ,
        required : true
        
        },
    },
    {
        timestamps : true ,
    })

    module.exports = mongoose.model('ProductSold' , ProductSoldSchema)