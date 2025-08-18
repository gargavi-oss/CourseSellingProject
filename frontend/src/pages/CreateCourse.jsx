// CreateCourse.jsx
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const CreateCourse = ({ func }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    author: "",
  });
  const [courseImage, setCourseImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourseImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.price ||
      !formData.author ||
      !courseImage
    ) {
      alert("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const form = new FormData();
      Object.keys(formData).forEach((key) =>
        form.append(key, formData[key])
      );
      form.append("courseImage", courseImage);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/createCourse`,
        form,
        { headers: { token } }
      );

      if (func) func();
      alert(response.data.message);
      setFormData({ title: "", description: "", price: "", author: "" });
      setCourseImage(null);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Course Title"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Course Description"
        rows={3}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author Name"
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="w-full text-sm text-gray-600"
      />
      <Button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {loading ? "Creating..." : "Create Course"}
      </Button>
    </form>
  );
};

export default CreateCourse;
