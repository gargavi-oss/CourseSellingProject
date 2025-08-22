import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

const UpdateCourses = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    author: ""
  });

  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/getCourseInfo/${id}`,
          { headers: { token } }
        );
  
        if (data?.course) {
          setFormData({
            title: data.course.title || "",
            description: data.course.description || "",
            price: data.course.price || "",
            author: data.course.author || ""
          });
        } else {
          toast.error("Course not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course details");
      }
    };
    fetchCourse();
  }, [id]);
  

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/updateCourse/${id}`,
        formData,
        {
          headers: {token} }
    
      );
      toast.success("Course updated successfully");
      setTimeout(()=>{
        navigate("/admin/courses");
      },3000)
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
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
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">
          Update Course
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mb-3"
        />

        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mb-3"
          rows="3"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mb-3"
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mb-3"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateCourses;
