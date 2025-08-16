import { Router } from "express";
import { addCourse, createCourse, deleteCourse, getAllCourses, getCoursesByUser, updateCourse } from "../controllers/courses.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.get("/allCourses",auth,getAllCourses);
router.post("/createCourse",upload.fields([{
    name: "courseImage",
    maxCount: 1,
}]),auth,createCourse);
router.put("/updateCourse/:id",auth,updateCourse);
router.delete("/deleteCourse/:id",auth,deleteCourse);
router.post("/addCourse/:id",auth,addCourse);
router.get("/getCoursesByUser",auth,getCoursesByUser)
export default router