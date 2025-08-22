import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, UserCog } from "lucide-react";
import CreateCourse from "./CreateCourse";

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

  const stats = [
    { icon: Users, color: "text-indigo-500", label: "Total Users", value: data?.totalUsers },
    { icon: BookOpen, color: "text-green-500", label: "Total Courses", value: data?.courses },
    { icon: UserCog, color: "text-purple-500", label: "Admins", value: data?.totalAdmin },
    { icon: DollarSign, color: "text-yellow-500", label: "Revenue", value: "$100" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <main className="flex-1 p-6 md:p-10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {data?.name || "Admin"} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Role: <span className="font-medium">{data?.role}</span>
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map(({ icon: Icon, color, label, value }, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4"
            >
              <Icon className={`w-10 h-10 ${color}`} />
              <div>
                <h3 className="text-xl font-bold">{value}</h3>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-2">
            ➕ Create New Course
          </h2>
          <CreateCourse />
        </motion.div>
      </main>
    </div>
  );
};

export default AdminPage;
