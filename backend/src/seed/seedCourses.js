import mongoose from "mongoose";
import dotenv from "dotenv";
import {Course }from "../models/courses.model.js";
import { DB_NAME } from "../constants.js";

dotenv.config();

const seedCourses = async () => {
  try {
   
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected for seeding");

    
    await Course.deleteMany({});
    console.log("🗑️ Old courses removed");

    const courses = [
      {
        title: "React Mastery",
        description: "Learn React from scratch with projects.",
        price: 199,
        author: "John Doe",
        courseImage: "https://pin.it/2XgLd0UpB"
      },
      {
        title: "Node.js Bootcamp",
        description: "Backend development with Express & MongoDB.",
        price: 149,
        author: "Jane Smith",
        courseImage: "https://pin.it/4hoMN59i8"
      },
      {
        title: "Fullstack MERN",
        description: "Complete MERN stack web development.",
        price: 249,
        author: "Mike Johnson",
        courseImage: "https://pin.it/5OGa3TyTe"
      }
    ];

    await Course.insertMany(courses);
    console.log("🎉 Dummy courses inserted");

    process.exit(); 
  } catch (error) {
    console.error("❌ Error seeding courses:", error);
    process.exit(1);
  }
};

seedCourses();
