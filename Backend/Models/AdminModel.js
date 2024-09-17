const mongoose = require("mongoose")

const AdminShema = new mongoose.Schema({
    AdminName : {
        type : String,
        required : true ,
        unique : [true , "Email already registerd "],
    } ,
    AdminPassword : {
    type : String ,
    required : true
    
    },
})

module.exports = mongoose.model('Admin' , AdminShema)