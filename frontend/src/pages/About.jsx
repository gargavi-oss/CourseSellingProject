import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Target } from "lucide-react";
import { HashLink } from "react-router-hash-link";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-sky-50 via-indigo-100 to-purple-200 text-gray-900 overflow-hidden px-6 py-16">
      
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold text-center mb-8 text-indigo-900 drop-shadow-sm"
      >
        About <span className="text-indigo-600">Us</span>
      </motion.h1>

    
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-3xl mx-auto text-center text-lg text-gray-700 leading-relaxed mb-16"
      >
        We are passionate about empowering learners with the skills they need
        to thrive in today’s digital world. From <span className="font-semibold text-indigo-700">web development</span> 
        to <span className="font-semibold text-indigo-700">modern technologies</span>, 
        our courses are designed to inspire, challenge, and transform.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
     
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300"
        >
          <Target className="mx-auto text-indigo-600 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-indigo-800 mb-2">Our Mission</h2>
          <p className="text-gray-600 text-sm">
            To make quality education accessible, practical, and engaging for
            learners across the globe.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300"
        >
          <BookOpen className="mx-auto text-indigo-600 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-indigo-800 mb-2">Our Vision</h2>
          <p className="text-gray-600 text-sm">
            To become the go-to platform for learning modern skills, bridging
            the gap between passion and profession.
          </p>
        </motion.div>

    
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300"
        >
          <Users className="mx-auto text-indigo-600 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-indigo-800 mb-2">Our Team</h2>
          <p className="text-gray-600 text-sm">
            A group of dedicated developers, mentors, and educators who believe
            in creating real impact through knowledge.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-20"
      >
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">
          Ready to start your journey?
        </h2>
        <p className="text-gray-700 mb-6">
          Explore our courses and unlock your potential today.
        </p>
        <HashLink
          to="#courses"
          smooth
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
        >
          Browse Courses
        </HashLink>
      </motion.div>
    </div>
  );
};

export default About;
