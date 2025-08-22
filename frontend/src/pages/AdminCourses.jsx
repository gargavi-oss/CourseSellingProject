import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar.jsx";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-200">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-1 bg-gray-200 min-h-screen rounded-2xl shadow p-4 md:p-6"
      >
        <h2 className="text-lg font-semibold text-indigo-700 mb-4">
          📚 All Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
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
                <span className="text-xs text-gray-600">By {course.author}</span>
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
    </div>
  );
};

export default AdminCourses;
