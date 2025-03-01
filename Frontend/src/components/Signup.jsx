import React from 'react'
import { useState } from 'react'
import HandleSignup from '../hooks/HandleSignup'
import {Link} from "react-router-dom"
const Signup = () => {
     const [inputs, setinputs] = useState({
          username:"",
          password:"",
          confirmpassword:"",
          email:"",
          gender:""
     });
     const {handle}=HandleSignup();
      const HandleSubmit=async(e)=>{
          e.preventDefault();     
      }
      const Handle=async()=>{
        await handle(inputs);
      }
     
  return (
    <div>
        <div className='text-5xl font-bold  text-center py-5 '>Note Taking App</div>
       <div className="flex flex-col items-center py-5 justify-center bg-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-slate-300 shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-900">Create an Account</h2>
        <form className="space-y-4" onClick={HandleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email" value={inputs.email} onChange={(e)=>{setinputs({...inputs,email:e.target.value})}}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text" value={inputs.username} onChange={(e)=>{setinputs({...inputs,username:e.target.value})}}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password" value={inputs.password} onChange={(e)=>{setinputs({...inputs,password:e.target.value})}}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password" value={inputs.confirmpassword} onChange={(e)=>{setinputs({...inputs,confirmpassword:e.target.value})}}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select value={inputs.gender} onChange={(e)=>{setinputs({...inputs,gender:e.target.value})}}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button  onClick={Handle}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Signup
