import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CourseInfo = () => {
  const { id } = useParams();
  const [courseInfo, setCourseInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/getCourseInfo/${id}`, {headers: {token}}
        );
        setCourseInfo(res.data.course);
      } catch (err) {
        console.error("Error while fetching course data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-700">
        Loading course info...
      </div>
    );
  }

  if (!courseInfo) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">
        Course not found!
      </div>
    );
  }

  return (
    <>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <img
        src={courseInfo.courseImage}
        alt={courseInfo.title}
        className="w-full h-64 object-cover rounded-xl shadow-md"
      />

      <h1 className="text-3xl font-bold text-indigo-700 mt-6">
        {courseInfo.title}
      </h1>

      <p className="text-gray-600 text-lg mt-4">{courseInfo.description}</p>

      <div className="flex items-center justify-between mt-6">
        <span className="text-md text-gray-500 italic">
          By {courseInfo.author}
        </span>
        <span className="text-xl font-semibold text-indigo-600">
          ${courseInfo.price}
        </span>
      </div>
   
    </div>
    <div className="flex justify-center items-center mt-4">
    <button className="bg-red-500 text-white  hover:bg-red-600 px-4 py-2 rounded-lg" onClick={()=>history.back()}>Back</button>
    </div>
    </>
  );
};

export default CourseInfo;
