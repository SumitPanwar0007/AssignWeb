const express = require('express');
const fs=require("fs")
const app = express();
const cors = require('cors');
const { type } = require('os');
const path ='./Routes/files/a.txt'

const mongoose = require('mongoose')
const TodoRouter=require('./Routes/todorouters')
const CourseRouter=require('./Routes/courserouter')
const UserRouter = require('./Routes/userrouter')

const port = process.env.PORT || 8085;

app.use(cors()); 
app.use(express.json())


// let userData=[
//     {id:1, name:"sumit",email:"spgcloud31@gmail.com",password:'Sumit@991199'},
//     {id:2,name:'shivam',email:'shivam99@gmail.com',password:"Shivam@991199"}
// ]
// let ADMINS=[   
//      {id:1, username:"sumit",email:"spgcloud31@gmail.com",password:'Sumit@991199'}
// ];
// let COURSES=[]; 

// let todos=[
//     {id:1,name:"task1",msg:"html",done:false},
//     {id:2,name:"task2",msg:"css",done:true}
//          ]

app.get('/', (req, res) => {
    res.send('Hello, World!');
    console.log("hello worlds!! ;)")
});

// ----------connect to mongooDB----
mongoose.connect('mongodb+srv://spgcloud31:qwertyuiop@100xdev.7ln22kv.mongodb.net/courseapp')


//----------------------------------------------Course------------------------------

app.use("/course",CourseRouter)

app.use("/user",UserRouter)
//---------------------------------------------Files-------------------------
app.get('/files', (req, res) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err) {
            res.status(400).send("File not found :)");
        } else {
            // Remove the console.log(data) when there's no error
            console.log(data);
            res.send(data); // Send the file contents as the response
        }
    });
});


//--------------------------TODO---------------------
app.use("/todoApi",TodoRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});