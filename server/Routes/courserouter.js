const express=require('express');
const courseRouter=express.Router()

const {User,Admin,Course}= require('../Models/todomodel.js');

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
        
///-----------------admin --------
courseRouter.get("/admin",authenticateJwt , async (req,res)=>{
    const admin=await Admin.find();
    res.status(200).json(admin);
})

courseRouter.get('/admin/course',adminAuthentication,async (req,res)=>{
    // res.status(200).send(COURSES);
    const course= await Course.find({})
    res.status(200).json({course})
})

courseRouter.post('/admin/login',adminAuthentication,(req,res)=>{
    
    if(req.admin){
    const token=generateJwt(req.admin)
    
    res.json({message:"Logged in successfully",token});
     }
     else{
        res.status(400).send({message:"Admin authentication Failed:)"})
     }
    // const token=generateJwt(admin);
 })

 courseRouter.post('/admin/signup',async (req,res)=>{

    const {username,email,password}=req.body;
    console.log(username,email,password)
    const existingAdmin= await Admin.findOne({username: username});
    if(existingAdmin){
        res.status(403).send({message:"Admin already exists"})
    }
    else
    {
    const admin={username,email,password}
    const newAdmin = new Admin(admin);
    await newAdmin.save();
  
    const token=jwt.sign({username,role:'admin'},secretKey,{expiresIn:'1h'});
    res.json({message:"Admin created successfully",token});

    }
})

courseRouter.post('/admin/course',authenticateJwt,async (req,res)=>{
 
    const course= new Course(req.body);
    await course.save();
    res.status(200).json({message:"Course is created successfully :)"})

})



courseRouter.put('/admin/course/:courseId',adminAuthentication,async (req,res)=>{

    const course= await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true});
    console.log("course is :  ", course)
    if(course){
        Object.assign(course,{Cname,description,price});
    
        console.log("The course is ",COURSES)
        res.status(200).send({message:"Course is Edited Successfully :)"})

    }
    else{
        res.status(400).send({message:"Course Cannot be added :)"})
    }

})
//------------------------------------------------User------------------
 



module.exports=courseRouter;