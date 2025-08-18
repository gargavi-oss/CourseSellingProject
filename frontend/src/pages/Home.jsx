import React from "react"
import { Button } from "@/components/ui/button"
import { UserCheck, Award, Play } from "lucide-react"
import { motion } from "framer-motion"
import { NavLink } from "react-router"
import StudentImage from "../assets/student.png"
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-sky-50 via-indigo-100 to-purple-200 text-gray-900 overflow-hidden">
     
      <div className="absolute w-96 h-96 bg-violet-200/40 rounded-full blur-3xl top-[-60px] left-[-100px]" />
      <div className="absolute w-96 h-96 bg-pink-200/40 rounded-full blur-3xl bottom-[-60px] right-[-150px]" />

      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-5  
        backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-md">
        <h1 className="text-2xl font-bold tracking-wide text-indigo-600">Coursify</h1>
        <nav className="space-x-10 hidden md:flex">
          <HashLink smooth to="#home" className="hover:text-indigo-600 font-medium">Home</HashLink>
          <HashLink to="#courses" smooth className="hover:text-indigo-600 font-medium">Courses</HashLink>
          <HashLink to="#about" smooth className="hover:text-indigo-600 font-medium">About Us</HashLink>
        </nav>
        <div className="space-x-4">
          <NavLink to="/signin" variant="secondary" className="bg-indigo-50 text-indigo-600 rounded-full px-6 py-2 shadow-sm hover:bg-indigo-100">
            Login
          </NavLink>
          <NavLink to="/signup" className="bg-indigo-600 text-white rounded-full px-6 py-2 shadow-md hover:bg-indigo-700">
            Sign Up
          </NavLink>
        </div>
      </header>

   
      <main className="flex flex-col md:flex-row items-center px-12 pt-25 md:ml-20 sm:ml-5 relative z-10">
       
        <div className="flex-1 space-y-6">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="text-indigo-600">Learning</span> Online <br /> is now{" "}
            <span className="text-pink-500">much easier</span>
          </h2>
          <p className="text-lg max-w-md text-gray-600">
            Coursify is an interactive platform that teaches you in a fun, 
            modern, and engaging way.
          </p>

          <div className="flex space-x-4">
            <NavLink to="/signup" className="bg-indigo-600 text-white py-1.5 rounded-full px-6 shadow-md hover:bg-indigo-700">
              Join for Free
            </NavLink>
            <Button variant="outline" className="flex items-center gap-2 rounded-full border-indigo-300 text-indigo-600 px-6 hover:bg-indigo-50 transition">
              <Play size={18} /> Watch Demo
            </Button>
          </div>

          <div className="flex space-x-6 mt-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-md bg-white/70 rounded-2xl shadow-lg p-6 flex items-center gap-3"
            >
              <UserCheck className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-xl font-bold">100+</p>
                <span className="text-sm text-gray-600">Assisted Students</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-md bg-white/70 rounded-2xl shadow-lg p-6 flex items-center gap-3"
            >
              <Award className="w-8 h-8 text-pink-500" />
              <div>
                <p className="text-xl font-bold">100%</p>
                <span className="text-sm text-gray-600">Course Completion</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex-1 mt-12 md:mt-0 flex justify-center relative">
          <motion.img
           src={StudentImage}
            alt="Student illustration"
            className="w-[320px] md:w-[450px] drop-shadow-2xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </main>
    </div>
  )
}
