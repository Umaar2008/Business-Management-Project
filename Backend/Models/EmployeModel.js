const mongoose = require("mongoose")

const EmployeeShema = new mongoose.Schema({
    EmployeeName : {
        type : String,
        required : true 
    } ,
    EmployeeGender : {
    type : String ,
    required : true
    
    }, 
    EmployeeAge : {
        type : Number ,
        required : true 
    },
    EmployeePassword : {
        type : String ,
        required : true 
    }
} 
)

module.exports = mongoose.model('Employee' , EmployeeShema)