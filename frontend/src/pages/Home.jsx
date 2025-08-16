import React from "react"
import { Button } from "@/components/ui/button"
import { UserCheck, Award, Play } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-violet-100 text-gray-900 overflow-hidden">
     
      <div className="absolute w-96 h-96 bg-violet-200/40 rounded-full blur-3xl top-[-60px] left-[-100px]" />
      <div className="absolute w-96 h-96 bg-pink-200/40 rounded-full blur-3xl bottom-[-120px] right-[-150px]" />

      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-12 py-5  
        backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-md">
        <h1 className="text-2xl font-bold tracking-wide text-indigo-600">Coursify</h1>
        <nav className="space-x-10 hidden md:flex">
          <a href="#" className="hover:text-indigo-600 font-medium">Home</a>
          <a href="#" className="hover:text-indigo-600 font-medium">Courses</a>
          <a href="#" className="hover:text-indigo-600 font-medium">About Us</a>
        </nav>
        <div className="space-x-4">
          <Button variant="secondary" className="bg-indigo-50 text-indigo-600 rounded-full px-6 shadow-sm hover:bg-indigo-100">
            Login
          </Button>
          <Button className="bg-indigo-600 text-white rounded-full px-6 shadow-md hover:bg-indigo-700">
            Sign Up
          </Button>
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
            <Button className="bg-indigo-600 text-white rounded-full px-6 shadow-md hover:bg-indigo-700">
              Join for Free
            </Button>
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
                <p className="text-xl font-bold">250k+</p>
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
            src="https://sdmntprwestus.oaiusercontent.com/files/00000000-94bc-6230-ba7a-5ad46a5ad542/raw?se=2025-08-16T10%3A03%3A42Z&sp=r&sv=2024-08-04&sr=b&scid=fe68495c-7545-5a32-8c96-bfb9967af0b9&skoid=a3412ad4-1a13-47ce-91a5-c07730964f35&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-08-16T02%3A01%3A31Z&ske=2025-08-17T02%3A01%3A31Z&sks=b&skv=2024-08-04&sig=HrMVxDNhGjAYYZQ0WYNfNQHpSpWe7ER0LN5xFB0f2tE%3D"
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
