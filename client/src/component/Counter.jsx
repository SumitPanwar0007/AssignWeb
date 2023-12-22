import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount]=useState(0)
  return (
    <div className='flex flex-col justify-center items-center w-full border-2 border-red-700 h-screen'>
     <div>
        <p className='text-5xl font-bold'>Count: {count}</p>
     </div>
      <div className='flex justify-center gap-6 py-8'>
        <button className='border-2 border-red-200 rounded  bg-red-300 px-2 hover:bg-red-600' onClick={()=>setCount(count+1)}>
          ADd </button>
        <button className='border-2 border-red-200 rounded  bg-red-300 px-2 hover:bg-red-600' onClick={()=>setCount(count-1)}>Sub</button>
       
      </div>
      
    </div>
  )
}

export default Counter
