import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  })
  const navigate = useNavigate()
  const dataRegister = async () => {
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.name === "" ||
      formData.avatar === null
    ) {
      alert("Enter all details")
      return
    }
  
    try {
      const data = new FormData()
      data.append("name", formData.name)
      data.append("email", formData.email)
      data.append("password", formData.password)
      data.append("avatar", formData.avatar)
  
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/signup`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
  
      if (response.data.success) {
        alert(response.data.message)
        setFormData({
          name: "",
          email: "",
          password: "",
          
          avatar: null,
        })
        setTimeout(() => {
          navigate("/signin") 
        }, 500)
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error("SignUp: ", error)
    }
  }
  
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "avatar") {
      setFormData({ ...formData, avatar: files[0] })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = (e) => {
    dataRegister()
    e.preventDefault()
    console.log(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-indigo-50 to-cyan-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg p-8"
      >
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-3 border rounded-xl bg-gray-50 text-gray-700 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="John Doe"
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar Image
            </label>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-xl bg-gray-50 text-gray-700 cursor-pointer focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:scale-105 transition"
          >
            Sign Up
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-indigo-600 font-semibold hover:underline">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  )
}

export default SignUp
