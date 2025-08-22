import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, Users, DollarSign } from "lucide-react";
import CreateCourse from "./CreateCourse";
import Sidebar from "../components/Sidebar.jsx";

const AdminPage = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/user`, { headers: { token } })
      .then((res) => setData(res.data))
      .catch(() => navigate("/signin"));
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      
      <Sidebar />

      <main className="flex-1 p-4 md:p-8 bg-gray-200">
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, {data?.name || "Admin"} 👋
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Role: <span className="font-medium">{data?.role}</span>
          </p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow rounded-2xl p-4 md:p-6 flex items-center gap-4"
          >
            <Users className="w-8 h-8 md:w-10 md:h-10 text-indigo-500" />
            <div>
              <h3 className="text-base md:text-lg font-semibold">{data?.totalUsers}</h3>
              <p className="text-gray-500 text-xs md:text-sm">Total Users</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow rounded-2xl p-4 md:p-6 flex items-center gap-4"
          >
            <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
            <div>
              <h3 className="text-base md:text-lg font-semibold">{data?.courses}</h3>
              <p className="text-gray-500 text-xs md:text-sm">Total Courses</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow rounded-2xl p-4 md:p-6 flex items-center gap-4"
          >
            <Users className="w-8 h-8 md:w-10 md:h-10 text-purple-500" />
            <div>
              <h3 className="text-base md:text-lg font-semibold">{data?.totalAdmin}</h3>
              <p className="text-gray-500 text-xs md:text-sm">Admins</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow rounded-2xl p-4 md:p-6 flex items-center gap-4"
          >
            <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-yellow-500" />
            <div>
              <h3 className="text-base md:text-lg font-semibold">$100</h3>
              <p className="text-gray-500 text-xs md:text-sm">Revenue</p>
            </div>
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow p-4 md:p-6"
        >
          <h2 className="text-base md:text-lg font-semibold text-indigo-700 mb-4">
            ➕ Create New Course
          </h2>
          <CreateCourse />
        </motion.div>
      </main>
    </div>
  );
};

export default AdminPage;
