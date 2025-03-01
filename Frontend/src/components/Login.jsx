import React from 'react'
import {Link} from "react-router-dom"
import { useState } from 'react'
import HandleLogin from '../hooks/HandleLogin'
const Login = () => {
       const [inputs, setinputs] = useState({
           username:"",
           password:""
       });
       const {Login}=HandleLogin();
     const HandleSubmit=(e)=>{
         e.preventDefault()    
     }
     const Handle=async()=>{
      await Login(inputs);
     }
  return (
    <div className=' min-h-screen bg-white' >
         <div className='text-5xl font-bold  text-center py-5 '>Note Taking App</div>
      <div className="flex relative top-28 items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 border  bg-slate-300 shadow-md rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login to Your Account</h2>
        <form  className="space-y-4" onClick={HandleSubmit} >
          <div>
            <div className="text-md font-medium relative right-0 text-gray-700">Username:</div>
            <input
              type="text" value={inputs.username} onChange={(e)=>{setinputs({...inputs,username:e.target.value})}}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <div className=" text-md font-medium relative right-0 text-gray-700">Password:</div>
            <input
              type="password" value={inputs.password} onChange={(e)=>{setinputs({...inputs,password:e.target.value})}}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
        
          <button onClick={Handle}
            
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Login
