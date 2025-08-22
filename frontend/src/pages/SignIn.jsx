import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Bounce, ToastContainer, toast } from 'react-toastify';
import axios from "axios"

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate()

  const dataRegister = async () => {
    if (formData.email === "" || formData.password === "") {
      toast.warn("Enter all details");
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/signin`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
  
        setTimeout(() => {
          if (response.data.role === "admin") {
            navigate(`/admin`);
          } else {
            navigate(`/home/${response.data.name}`);
          }
        }, 3000);
      } else {
       
        toast.error(response.data.message);
      }
    } catch (error) {
     
  
      if (error.response) {
    
        toast.error(error.response.data.message || "Login failed!");
      } else {
      
        toast.error("Unable to login. Please try again later.");
      }
    }
  };
  


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dataRegister()
    console.log(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-indigo-50 to-cyan-100 px-6">
<ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8"
      >
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
        
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:scale-105 transition"
          >
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  )
}

export default SignIn
