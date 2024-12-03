import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';


const Signup = () => {
    const[signupData,setSignupData]=useState({
        username:'',
        email:'',
        password:'',
    })

    const handleChange =(e)=>{
        const{name,value}=e.target
        setSignupData({...signupData,[name]:value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        // console.log("Response",signupData);
        const apiUrl = "http://localhost:3000/user/signup";
        try {
          const res =await axios.post(apiUrl,signupData)
          if(res){
            console.log(res.data.user)
            setSignupData(res.data.user);
          }
          Swal.fire({
            title: "Signup Successfully!",
            text: "Your Account is Create",
            icon: "success"
          });
        } catch (error) {
          console.error('Error',error);
  
        }
    }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      {/* <img
        alt="Your Company"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-10 w-auto"
      /> */}
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Create your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form  method="POST" className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
            Username
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              value={signupData.username}
              onChange={handleChange}
              required
              autoComplete="username"
              className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={signupData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
            {/* <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div> */}
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={signupData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          {/* <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button> */}
          <button
            type="submit"
            onClick={handleSubmit}
            className=" mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
             Create an Account
          </button>
          <button
            type="submit"
            className=" mt-3 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Link to="/" >Log In</Link>
          </button>
        </div>
      </form>

      {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?{' '}
        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Start a 14 day free trial
        </a>
      </p> */}
    </div>
  </div>
  )
}

export default Signup
