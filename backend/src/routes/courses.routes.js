import { Router } from "express";
import { addCourse, createCourse, deleteCourse, deleteCourseByAdmin, getAllCourses, getCourseInfo, getCoursesByUser,  updateCourse } from "../controllers/courses.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.get("/allCourses",getAllCourses);
router.post("/createCourse",upload.fields([{
    name: "courseImage",
    maxCount: 1,
}]),auth,createCourse);
router.put("/updateCourse/:id",auth,updateCourse);
router.delete("/deleteCourse/:id",auth,deleteCourse);
router.delete("/deleteCourseByAdmin/:id",auth,deleteCourseByAdmin);
router.post("/addCourse/:id",auth,addCourse);
router.get("/getCoursesByUser",auth,getCoursesByUser)
router.get("/getCourseInfo/:id",auth,getCourseInfo);

export default router