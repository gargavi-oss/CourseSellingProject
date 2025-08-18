import mongoose from "mongoose";
import dotenv from "dotenv";
import { Course } from "../models/courses.model.js";
import { DB_NAME } from "../constants.js";
import { getImageUrl } from "../utils/getImageUrl.js";

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
        description: "Master React.js from scratch with hands-on projects. Learn JSX, components, props, state, hooks, routing, and advanced patterns. Build real-world apps and understand performance optimization, deployment, and best practices for scalable React applications.",
        price: 199,
        author: "John Doe",
        courseImage: getImageUrl("https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=900&q=60"),
      },
      {
        title: "Node.js Bootcamp",
        description: "A complete backend development guide using Node.js, Express, and MongoDB. Learn API development, authentication with JWT, error handling, and deployment on cloud servers. Includes hands-on projects like building REST APIs, authentication systems, and full backend apps.",
        price: 149,
        author: "Jane Smith",
        courseImage: "https://img-c.udemycdn.com/course/750x422/1672410_9ff1_5.jpg",
      },
      {
        title: "Fullstack MERN",
        description: "Become a fullstack web developer by learning the MERN stack (MongoDB, Express, React, Node). Build end-to-end applications with user authentication, CRUD operations, and deployment. Learn modern practices like state management, JWT auth, and scalable architecture.",
        price: 249,
        author: "Mike Johnson",
        courseImage: getImageUrl("https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=900&q=60"),
      },
      {
        title: "Python for Data Science",
        description: "Learn Python with a focus on Data Science. Covers Python fundamentals, NumPy, Pandas, Matplotlib, Seaborn, and hands-on projects like data cleaning, visualization, and analysis. Ideal for beginners and professionals wanting to enter the world of data science.",
        price: 179,
        author: "Emily Davis",
        courseImage: getImageUrl("https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=60"),
      },
      {
        title: "Machine Learning A-Z",
        description: "A practical ML course covering supervised and unsupervised learning, regression, classification, clustering, and deep learning with TensorFlow and Keras. Learn how to preprocess data, build models, evaluate performance, and deploy ML solutions.",
        price: 299,
        author: "David Miller",
        courseImage: getImageUrl("https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=60"),
      },
      {
        title: "UI/UX Design Fundamentals",
        description: "Learn design thinking, wireframing, prototyping, and visual design principles using Figma. Understand color theory, typography, accessibility, and usability testing. Build beautiful, user-friendly, and modern web & mobile app interfaces.",
        price: 129,
        author: "Sophia Lee",
        courseImage: "https://learn.kalpas.in/wp-content/uploads/2023/08/Frame-49-scaled.jpg",
      },
      {
        title: "DevOps Crash Course",
        description: "Get started with DevOps: Learn CI/CD pipelines, GitHub Actions, Docker containers, Kubernetes clusters, and deployment on AWS/GCP. Includes practical projects like automating deployments, containerizing apps, and managing microservices.",
        price: 219,
        author: "Chris Evans",
        courseImage: "https://media.geeksforgeeks.org/img-practice/prod/courses/483/Web/Other/Course_Devops_png_1720845900.png",
      },
      {
        title: "Cybersecurity Basics",
        description: "Understand cybersecurity fundamentals, encryption, penetration testing, and threat analysis. Learn how to secure networks, web apps, and databases against common attacks like SQL injection, XSS, and DDoS. Includes hands-on labs and real-world case studies.",
        price: 189,
        author: "Olivia Brown",
        courseImage: "https://i.ytimg.com/vi/C2NQ0jScRno/maxresdefault.jpg",
      },
      {
        title: "Cloud Computing with AWS",
        description: "Learn the fundamentals of cloud computing with AWS. Covers EC2, S3, Lambda, RDS, IAM, and more. Hands-on labs for deploying scalable apps, managing security, and optimizing cloud costs. Perfect for developers and cloud enthusiasts.",
        price: 259,
        author: "Ethan Wilson",
        courseImage: getImageUrl("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=60"),
      },
      {
        title: "Mobile App Development",
        description: "Learn to build mobile apps with React Native. Covers navigation, state management, API integration, animations, and publishing to App Store & Play Store. Create cross-platform mobile apps with modern design and real-world functionality.",
        price: 199,
        author: "Ava Martinez",
        courseImage: getImageUrl("https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=900&q=60"),
      },
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
