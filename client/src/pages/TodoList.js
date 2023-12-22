import React, { useEffect, useState } from 'react'

const TodoList = () => {
  const [input,setInput]=useState([ ]);
  const [inputName,setInputName]=useState([]);
  const[todos, setTodos] = useState([]);

  const [fileContent,setFileContent]=useState([]);
  
  const handleInput=(e)=>{
    setInput(e.target.value);
 }

 const handleSubmit=async(e)=>{
  e.preventDefault();
  let length=fileContent.length;

    let newTodo={
      id:length+1,
      name:inputName,
      msg:input,
      status:true
    }
    try{
      const response = await fetch('http://localhost:8085/addtodo',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(newTodo)
      })
      if(response.ok){
        console.log("todo added bidya se!!")
      }
      else{
        console.log("failed to add todo",response.statusText)
      }
    }
    catch(error){
      console.log('error is in adding todo is here: ',error)
    }
    setFileContent((fileContent)=>[...fileContent,newTodo])

    setInput('');
    setInputName('')
    console.log("this is file content data: ",fileContent);
  }

  const handleDelete=async(id)=>{
    try{
      const response= await fetch(`http://localhost:8085/deleteTodo/${id}`,{
        method:"DELETE",
        headers:{
          "content-Type":"application/json"  //it tells the server that you are sending json
        }
       })
       console.log("let's delete",response)
       if(response.ok){
        console.log("todo deleted successfully!!!")
        setFileContent((prevTodos)=>prevTodos.filter(todo=>todo.id!==id));
      }
      else{
        console.log("Failed to delete the todo",response.statusText)
      }
  }
    catch(error){
      console.log('Error in deleting the todo', error);
    }

  }

  useEffect(()=>{
    fetch('http://localhost:8085/todo')
    .then(res=>res.json())
    .then(data=>{
      setFileContent(data.todo);
 
    })
    

  },[])

  const handleEdit=()=>{
    console.log("lets edit this ")
  }
 
  return (
    <div className='w-full bg-stone-200 py-4'>


    <div className='w-2/3 rounded-lg shadow-md shadow-slate-500  bg-stone-300 mx-auto border-2  p-4 flex flex-col justify-center items-center '>
   
     <h1 className="text-center text-3xl font-bold">Todo List</h1>
      
      <form className='w-10/12 ' action="" onSubmit={handleSubmit} >
      {/* name input */}
      <div className='w-full flex flex-col justify-start items-start'>
      <label for='title'>Todo Title</label>
      <input className='w-full mb-6 rounded-md border-2 px-2 border-slate-700 bg-stone-200' type="text" name="title"
        value={inputName} placeholder='name' onChange={(e)=>setInputName(e.target.value)} />
      </div>
      
      <div className='w-full flex flex-col justify-start items-start'>
      <label  for='msg'> Todo Description</label>
      <input className='rounded-md w-full px-2 mb-6 border-2 border-slate-700 bg-stone-200' type="text" name="msg"
        value={input} placeholder='todo' onChange={(e)=>setInput(e.target.value)} />
      </div>
       
        <button className=" mb-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg p-2" >Add </button>
      </form>


      {fileContent && 
        fileContent.map((todo)=>(
        <div className='flex-col gap-4 w-full bg-stone-100 my-2'>
            
        <div className='flex w-full justify-between px-6'>
            <p>{todo.id}</p>
            <p>{todo.name}</p>
        </div>
       
     <div className='w-full rounded-md h-8 gap-4 my-2 border-slate-700 bg-stone-200' key={todo}>
       {todo.msg}
       </div>
       <div className='flex justify-around gap-4 px-2'>
        <button className='w-1/3 rounded-lg bg-green-600 my-2 px-2 shadow-md shadow-slate-700'
         onClick={handleEdit} type="button">Edit</button>

        <button className='w-1/3 rounded-lg bg-red-600 my-2 px-2 shadow-md shadow-slate-700'
         onClick={handleDelete} type="button">Delete</button>

        </div>
     </div> 
   
        ))
}
   
</div>
    </div>
  )
}

export default TodoList
