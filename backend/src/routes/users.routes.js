import { Router } from "express";
import { deleteUser, getAllUsers, signIn, signUp, user } from "../controllers/users.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()
router.get("/user",auth,user)
router.post("/signin",signIn);
router.post("/signup", upload.fields([{
    name: "avatar",
    maxCount: 1,
}]),signUp)
router.get("/getUsers",auth,getAllUsers)
router.delete("/deleteUser/:id",auth,deleteUser)

export default router