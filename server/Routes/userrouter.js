const express=require('express');
const userRouters=express.Router()
const jwt=require('jsonwebtoken')
userRouters.use(express.json());

const {User,Course,Admin}= require('../Models/todomodel.js');


// ------------------------------Authentication-----------------

let secretKey="Sumit9911"

const generateJwt=(user)=>{
    const payload={username:user.username};
    return jwt.sign(payload,secretKey,{expiresIn:'1h'})

    
}

const adminAuthentication=async (req,res,next)=>{

    console.log("inside authentication")
    const {username,password}=req.body;
    console.log(username,password)
   const admin = await Admin.findOne({username,password})  
    // const admin= ADMINS.find(a=>a.username===username && a.password===password )
    if(admin){
        req.admin=admin;
        next();
    }
    else{
        res.status(400).send({message:"Admin authentication failed"})
    }
 }


 const authenticateJwt=(req,res,next)=>{

    const authToken=req.headers['authorization'];
    if(!authToken){
        return res.status(401).send({message:"No token provided"})
    }
    else{
        const token = authToken.substring(7);
        jwt.verify(token,secretKey,(err,decoded)=>{
            if(err){
                return res.status(401).send({message:"Unauthorized"})
           }
           else{
            req.decoded=decoded;
            next();
           }
    })
    }
  
        }



userRouters.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    const user= await User.findOne({username,password});
    if(user){
        const token=jwt.sign({username,role:'user'},secretKey,{expiresIn:'1h'});
        res.json({message:'Logged in successfully',token});
    }
    else{
        res.status(403).json({message:'Invalid username or password'});
    }
})


userRouters.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body;
    console.log("data is",username,password,email)
    const user= await User.findOne({username})
    console.log(user)
    if(user){
        res.status(400).send({message:"sry:The user already exist!!"})
    }
    else{
        const newUser=new User({username,email,password})
        await newUser.save()
        const token=jwt.sign({username,role:'user'},secretKey,{expiresIn:'1h'})
        res.json({message:"User created successfully",token});

    }
})

userRouters.get('/courses',authenticateJwt,async (req,res)=>{
    const courses= await Course.find({published:true});
    res.json({courses});
})

userRouters.post('/courses/:courseId',authenticateJwt,async (req,res)=>{
    const course=await Course.findById(req.params.courseId);
    console.log(course);
    if(course){
        const user = await User.findOne({username:req.user.username});
        if(user){
            user.purchasedCourses.push(course);
            await user.save()
            res.json({message:"Course purchased successfully"})
        }
        else{
            res.status(400).send({message:"User not found"})
        }
    }
    else{
        res.status(404).send({message:"Course not found"})
    }
})

module.exports=userRouters;