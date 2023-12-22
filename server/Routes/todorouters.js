const express=require('express');
const todoRouter=express.Router()

todoRouter.use(express.json());

const {TodoDb}= require('../Models/todomodel.js');



// ---------------------------------------------TODO------------------ READ from the file/json


todoRouter.get('/todo',async (req,res)=>{
        try{
            let todos = await TodoDb.find();
            res.status(200).json(todos);

        }
        catch(err){
            console.log("Error in getting data", err)
            res.status(500).json({err:"Error in fetching data"})
        }
    
        })
   

todoRouter.get('/todo/:title', async (req,res)=>{
        const todoTitle= req.params.title;
    console.log('todo id is: ',todoTitle);
    try{
        let result = await TodoDb.findOne({title:todoTitle})
        if(!result){
           return res.status(400).json({message:'No Todo found'})
        }
        else{
           return res.status(200).json(result)
        }
    }
    catch(err){
        console.error(`ERROR: ${err}`);
      return  res.status(400).json({message:`Cannot find todo with the id of ${todoTitle}`, error:err});
            }
       
    
        })

//create todo

todoRouter.post('/addtodo/',async (req,res)=>{
        try{
          const newTodo=req.body;
            console.log("this is newtodo titile : ",newTodo.title)
            if(newTodo){
                const duplicate= await TodoDb.findOne({title:newTodo.title})
                if(duplicate){
                    return res.status(409).send({message:"Duplicate Entry"})
                }
                else{
                    let addedTodo=await TodoDb.create(newTodo)
                    return  res.status(201).json(addedTodo)
                }
            }
           return res.status(400).send({message:"Invalid req body"})
        }
        catch(error){
           return res.status(400).send({message:"Todo  is not added "})

        }


        // TodoDb.create(newTodo).then(()=>{
        //     res.status(201).json(newTodo);

        // }).catch((error)=>{
        //     console.log("Error in adding a new item", error);
        // })
        // fs.readFile("todos.json","utf-8",(err,data)=>{
        //     if(!err){
                
        //        var todos=JSON.parse(data)
        //         newTodo={...newTodo, id:todos.length+1};
        //         todos=[...todos,newTodo];
                
        //         fs.writeFile("todos.json",JSON.stringify(todos),(err)=>{
        //             if(!err){
                        
        //                 res.status(201).json(newTodo);
        //             }
        //             else{
        //                 res.status(400).json(err)
        //             }
        //         })
        //     }
        //     else{
        //         console.log(err)
        //         res.send("there is an error",err)
        //     }
        // })
        // // if(newTodo){

        // //     todos.push(newTodo);
        // //     res.json({message:'successfully added a task'})
        // // }
        // // else{
        // //     res.status(404).json({error:"invalid or empty req"})
        // // }

         })

todoRouter.put('/updatetodo/:title', async (req,res)=>{
    const todoTitle = req.params.title;
    const updatedTodo={...req.body};
    console.log(todoTitle,updatedTodo)
    try{
        let foundTodo= await TodoDb.findOne({title:todoTitle});
        console.log("inside")
        if(!foundTodo){
            res.status(400).send({message:"todo with this id is not found :)"})
        }
        else{
            const updateTodo=await TodoDb.findOneAndUpdate({title:todoTitle},updatedTodo,{new:true});
          return  res.status(200).json(updateTodo)
        }
    }
    catch(e){
        res.status(500).send({message:"Internal Server Error :/ " + e});
    }
})

todoRouter.delete('/deleteTodo/:title',async (req,res)=>{
    const todoTitle= req.params.title;
    let deletedTodo;
    try{
        deletedTodo=await TodoDb.findOneAndDelete({title:todoTitle})
        if(!deletedTodo){
            return res.status(400).json({message:"No such Todo found!"})
        }
        else{
            res.status(200).json({message:`Deleted the Todo with ID ${deletedTodo} successfully!`})
        }
    }
    catch(e){
        res.status(500).json({message:"Error in deleting the Todo "+e})
    }
})

module.exports = todoRouter;