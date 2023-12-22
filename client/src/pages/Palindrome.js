import React, { useState } from 'react'

const Palindrome = () => {
    const [input, setInput] = useState('')
    const [result,setResult]=useState("")

const isPalindrome = (str)=>{
        const reversedStr = str.split('').reverse().join('');
        const isPalindrome=str === reversedStr;
       setResult(isPalindrome?"yeah it's a Plaindrome":"Nope It's not a Palindrome")
       
    }
    const handleInput=(e)=>{
        setInput(e.target.value)
    }

    const handleResult=(e)=>{
        e.preventDefault();
        if(input.trim()!=''){
            isPalindrome(input);
            setInput('')
        }
       
        console.log(input)
    
        
    }
//   function SumNumber(one,last){
       
//         return sum

//     }


    // var startTime=new Date().getTime();
   
    function findTime(n){
        const startTime=performance.now();
        // const res=SumNumber(1,n);
        let sum=0;
        for(let i=1;i<=n;i++){
            sum+=i
        }
        console.log(sum)
   const endTime=performance.now();
    console.log("Time taken is: "+(endTime-startTime).toFixed(3));

    }
  findTime(10000)
    
    
    
  return (
    <div className='  my-32'>
        <p>This is palindrome</p>
        <h2 className='my-4 font-semibold text-2xl text-red-600'>
            Input ypur String to check palindrome</h2>
        <input className='rounded-lg border-2 border-gray-300 py-4 text-center '
          type="text" value={input} onChange={handleInput}/>
        <button className='border-2 bg-yellow-700 rounded-lg ml-8 p-2' 
        type="submit" onClick={handleResult}>Check</button>
      {result &&  
      <div className=' items-center mx-auto w-2/3 rounded-lg bg-slate-300 border-1 border-gray-300 py-4 text-center  my-8'>
        {result}
        </div>}
    
    </div>
  )
}

export default Palindrome
