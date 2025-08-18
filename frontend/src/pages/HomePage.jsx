import axios from "axios";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [data, setData] = useState({});
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    try {
      const [userRes, allCoursesRes, enrolledRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user`, {
          headers: { token },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/allCourses`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/getCoursesByUser`, {
          headers: { token },
        }),
      ]);

      setData(userRes.data);
      setCourses(allCoursesRes.data.courses || []);
      setEnrolledCourses(enrolledRes.data.enrolledCourses || []);
    } catch (err) {
      console.error("Error while fetching data", err);
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addCourse = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/addCourse/${id}`,
        {},
        { headers: { token } }
      );
      alert(response.data.message);
      fetchData();
    } catch (error) {
      console.log("error while adding course", error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/deleteCourse/${id}`,
        { headers: { token } }
      );
      alert(response.data.message);
      fetchData();
    } catch (error) {
      console.log("error while deleting course", error);
    }
  };
  const goToCourseInfo = (id)=>{
    navigate(`/courseinfo/${id}`)
  }

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-50 to-green-50 p-6">
    
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-indigo-700">
          Welcome, {data?.name || "User"}
        </h1>
        <button
          onClick={logOut}
          className="px-4 py-2 bg-red-500 text-white text-sm rounded-xl shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-lg font-semibold text-indigo-700 mb-4">
            📚 All Courses
          </h2>
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            {courses.map((course, i) => (
              <motion.div
                key={course._id || i}
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
                  <button onClick={()=>goToCourseInfo(course._id)}
                    className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700"
                    >
              View Detail
                  </button>
                  <button
                    onClick={() => addCourse(course._id)}
                    className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700"
                  >
                    Enroll
                  </button>

                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-lg font-semibold text-green-700 mb-4">
            ✅ Your Enrollments
          </h2>
          <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            {enrolledCourses.map((course, i) => (
              <motion.div
                key={course._id || i}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-green-50 to-white border rounded-xl shadow p-4 flex flex-col"
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
                  <button
                    onClick={() => deleteCourse(course._id)}
                    className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
           <img src={data.avatar}   className="w-full h-full object-cover rounded-full" alt="" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {data?.name || "User"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">{data?.email}</p>
          <div className="flex flex-col gap-3 w-full">
            <div className="p-3 rounded-lg bg-indigo-50 text-sm text-gray-700 shadow">
              🎯 Courses Enrolled:{" "}
              <span className="font-bold">{enrolledCourses.length}</span>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-sm text-gray-700 shadow">
              📘 Total Courses:{" "}
              <span className="font-bold">{courses.length}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
