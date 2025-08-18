import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, BookOpen, Users, DollarSign, LogOut } from "lucide-react";
import CreateCourse from "./CreateCourse";

const AdminPage = () => {
  const [data, setData] = useState({});
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/user`, { headers: { token } })
      .then((res) => setData(res.data))
      .catch(() => navigate("/signin"));
  }, [navigate]);

const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }
    try {
      const allCoursesRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/allCourses`
      );
      setCourses(allCoursesRes.data.courses || []);
    } catch (err) {
      console.error("Error while fetching data", err);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  
  const deleteCourse = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/deleteCourseByAdmin/${id}`,
        { headers: { token } }
      );
      alert(response.data.message);
      fetchData();
    } catch (error) {
      console.log("Error while deleting course", error);
    }
  };

  const goToCourseInfo = (id) => {
    navigate(`/courseinfo/${id}`);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
     
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-8">
            Admin Dashboard
          </h2>
          <nav className="space-y-4">
            <button className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800">
              <BarChart3 className="w-5 h-5" /> Dashboard
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600" onClick={()=>navigate("/admin/courses")}>
              <BookOpen className="w-5 h-5" /> Courses
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600">
              <Users className="w-5 h-5" /> Users
            </button>
          </nav>
        </div>
        <button
          onClick={logOut}
          className="flex items-center gap-2 text-red-600 font-medium hover:text-red-800"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      
      <main className="flex-1 p-8">
    
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, {data?.name || "Admin"} 👋
          </h1>
          <p className="text-gray-500">
            Role: <span className="font-medium">{data?.role}</span>
          </p>
        </header>

      
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow rounded-2xl p-6 flex items-center gap-4"
          >
            <Users className="w-10 h-10 text-indigo-500" />
            <div>
              <h3 className="text-lg font-semibold">{data?.totalUsers}</h3>
              <p className="text-gray-500 text-sm">Total Users</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow rounded-2xl p-6 flex items-center gap-4"
          >
            <BookOpen className="w-10 h-10 text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">{courses.length}</h3>
              <p className="text-gray-500 text-sm">Total Courses</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow rounded-2xl p-6 flex items-center gap-4"
          >
            <Users className="w-10 h-10 text-purple-500" />
            <div>
              <h3 className="text-lg font-semibold">{data?.totalAdmin}</h3>
              <p className="text-gray-500 text-sm">Admins</p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow rounded-2xl p-6 flex items-center gap-4"
          >
            <DollarSign className="w-10 h-10 text-yellow-500" />
            <div>
              <h3 className="text-lg font-semibold">$100</h3>
              <p className="text-gray-500 text-sm">Revenue</p>
            </div>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h2 className="text-lg font-semibold text-indigo-700 mb-4">
              📚 All Courses
            </h2>
            <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2">
              {courses.map((course) => (
                <motion.div
                  key={course._id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-indigo-50 to-white border rounded-xl shadow p-4 flex flex-col"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={course.courseImage}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-bold">{course.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {course.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-600">
                      By {course.author}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => goToCourseInfo(course._id)}
                        className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

       
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow p-6 lg:col-span-2"
          >
            <h2 className="text-lg font-semibold text-indigo-700 mb-4">
              ➕ Create New Course
            </h2>
            <CreateCourse func={fetchData} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
