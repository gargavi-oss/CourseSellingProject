import { Router } from "express";
import { addCourse, createCourse, deleteCourse, getAllCourses, getCoursesByUser, updateCourse } from "../controllers/courses.controller.js";
import { auth } from "../middlewares/auth.middleware.js";


const router = Router()

router.get("/allCourses",auth,getAllCourses);
router.post("/createCourse",auth,createCourse);
router.put("/updateCourse/:id",auth,updateCourse);
router.delete("/deleteCourse/:id",auth,deleteCourse);
router.get("/addCourse/:id",auth,addCourse);
router.get("/getCoursesByUser",auth,getCoursesByUser)
export default router