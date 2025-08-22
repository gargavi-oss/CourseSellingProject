import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bounce, toast, ToastContainer } from "react-toastify";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/signin");
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/allCourses`);
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/deleteCourseByAdmin/${id}`,
        { headers: { token } }
      );
      toast.success("Course deleted")
      fetchData();
    } catch (err) {
      console.error("Error deleting course", err);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-100 min-h-screen">
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
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">📚 All Courses</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div
            key={course._id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={course.courseImage}
                alt={course.title}
                className="w-20 h-20 rounded-lg object-cover shadow"
              />
              <div>
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{course.description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-600">By {course.author}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/courseinfo/${course._id}`)}
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
                <button
                  onClick={() => navigate(`/admin/updateCourse/${course._id}`)}
                  className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
