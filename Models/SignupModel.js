const mongoose=require('mongoose')

const SignupSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true, 
    },
    password:{
        type:String,
        required:true

    }
},{timestamps:true})

module.exports=mongoose.model('Signup',SignupSchema)
