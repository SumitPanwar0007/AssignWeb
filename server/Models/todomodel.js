const mongoose = require('mongoose');


//--------------------------------------------mongoose schema--------------------
const userSchema= new mongoose.Schema({
    username:String,
    email:String ,
    password:String,
    
    // purchasedCourses:[{type: mongoose.Schema.Types.ObjectId,ref:'Course'}]

});

const adminSchema = new mongoose.Schema({
    username:String,
    password:String,
    Email:String
})
const courseSchema = new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    published:Boolean
})

const TodoSchema= new mongoose.Schema({
    // id: Number ,
    title:String,
    todo: String,

})


//----------define Mongoose Models---------------it says that 
const User= mongoose.model("User",userSchema);
const Admin= mongoose.model("Admin",adminSchema);
const Course= mongoose.model("Course",courseSchema);
const TodoDb= mongoose.model("Todo",TodoSchema)


module.exports={User,Admin,Course,TodoDb}