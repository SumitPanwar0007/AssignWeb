const express= require("express")


const router=express.Router();

//routers

router.get('/filename',(req,res)=>{
    fs.readFile("a.txt",'utf-8',(err,data)=>{
        if(err){
            res.status(400).send("File not found :)")
        }
        else{
             console.log(data)
             res.send(data);
        }
    })
})