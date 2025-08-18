import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export async function signUp(req,res){
    try {
        const {email,name,password} = req.body;
    if(email=='' || name ==''|| password== ''){
        return res.send({
            message: "User Details required",
            success: false
        })
    }
    const foundUser = await User.findOne({email})
    
    
    if(foundUser){
      return res.status(409).send({
            message: "User Already exists",
            success: false
        })
    }
    else {
      const avatarLocalPath = req.files?.avatar[0].path;
   
    if (!avatarLocalPath) {
      return res.status(404).send({
        message: " Avatar image is required"
      })  
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      return res.status(500).send({
        message: "Failed to upload avatar to Cloudinary",
        success: false
      });
    }
    
        const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
            name: name,
            email: email,
            avatar: avatar.url,
            password: hashedPassword,
        })
if(role=="admin"){
    res.send({
        message: "admin signup",
        success: true
    })
}
res.send({
    message: "User signup",
    success: true
})
    }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
    }
    
}
export async function signIn(req,res){
    try {
        const {email,password} = req.body;
    const foundUser = await User.findOne({email});
    if(!foundUser){
        res.status(404).send({
            message: "User not registered",
            success: false
        })
    }
    const isMatch = await bcrypt.compare(password,foundUser.password)
    if(!isMatch){
        return res.status(401).json({
            message: "Invalid credentials",
            success: false
          });
    }
    const token = jwt.sign(
        { id: foundUser._id, role: foundUser.role, name: foundUser.name },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.cookie("csrftoken", token, {
        httpOnly: true,
        secure: true,             
        sameSite: "None",       
      });
      
      if (foundUser.role === "admin") {
        return res.send({
          token,
          message: "Admin signed in",
          name: foundUser.name,
          role: foundUser.role,
          success: true
        });
      }
    return res.send({
        token,
        message: "User signed in",
        role: foundUser.role,
        name: foundUser.name,
        success: true
    })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: "Internal server error",
          success: false
        });
    }   
}
export async function user(req, res) {
    try {
      const signedInUser = req.user; 
      const user = await User.findById(signedInUser.id);

const totalUsers = await User.find({ role: { $ne: "admin" } });
const totalAdmin = await User.find({role: {$ne: "user"}})

  
      if (user) {
        return res.send({

            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            totalUsers: totalUsers.length,
            totalAdmin: totalAdmin.length
        });
      }
  
      res.status(404).send({ message: "User not found", success: false });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
}