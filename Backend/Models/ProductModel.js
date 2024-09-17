 const mongoose = require("mongoose")

const Productschema = new mongoose.Schema({
    ProductName : {
        type : String,
        required : true 
    } ,
    ProductStock : {
        type : Number ,
        required : true
    } ,
    ProductPrice  : {
        type : Number ,
        required : true
    },
    ProductCategory : {

        type : String ,
        required: true
    } 
},
{
    timestamps : true ,
}

)

module.exports = mongoose.model('Product' , Productschema)
