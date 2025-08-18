import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/allCourses`)
      .then((res) => setCourses(res.data.courses || []))
      .catch((err) => console.log(err));
  }, []);

  const displayedCourses = showAll ? courses : courses.slice(0, 3);

  return (
    <div className="relative h-auto bg-gradient-to-r from-sky-50 via-indigo-100 to-purple-200 text-gray-900 px-6 py-19 ">
    
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extrabold text-center mb-12 text-indigo-900 drop-shadow-sm"
      >
        Explore Our <span className="text-indigo-600">Courses</span>
      </motion.h1>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {displayedCourses.map((course, i) => (
          <motion.div
            key={course._id || i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative">
              <img
                src={course.courseImage}
                alt={course.title}
                className="w-full h-44 object-cover"
              />
            
              <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                ${course.price}
              </span>
            </div>

            <div className="p-6 flex flex-col flex-1">
    <h2 className="text-lg font-bold text-indigo-800 mb-2">
      {course.title}
    </h2>
    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
      {course.description}
    </p>

    <div className="flex items-center justify-between mt-auto">
      <span className="text-sm text-gray-500 italic">
        By {course.author}
      </span>
      <button
        onClick={() => navigate("/signin")}
        className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg shadow hover:bg-indigo-700 transition"
      >
        View
      </button>
    </div>
  </div>
          </motion.div>
        ))}
      </motion.div>

     
      {courses.length > 3 && (
        <div className="flex justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
          >
            {showAll ? "Show Less" : "Show More"}
            {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Courses;
