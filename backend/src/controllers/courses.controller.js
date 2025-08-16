import { Course } from "../models/courses.model.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export async function getAllCourses(req, res) {
    try {
        const signedInUser = req.user;
        const user = await User.findById(signedInUser.id);

        if (!user) {
            return res.status(403).json({
                message: "User doesn't exist",
                success: false
            });
        }

        const courses = await Course.find();

        return res.status(200).json({
            success: true,
            courses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export async function getCoursesByUser(req,res){
    try {
        const signedInUser = req.user;
        const user = await User.findById(signedInUser.id);
        if (!user) {
          return res.status(404).send({
            message: "User not found",
            success: false
          });
        }
        return res.send({
            enrolledCourses: user.enrolledCourses,
            totalCourses: user.enrolledCourses.length >0? user.enrolledCourses.length : 0
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export async function createCourse(req, res) {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin privileges required.",
                success: false
            });
        }

        const { title, description, price,author } = req.body;
        if (!title || !description || !price) {
            return res.status(400).json({
                message: "Provide all course details to proceed",
                success: false
            });
        }
        const courseFilePath = req.files?.courseImage[0].path;
        if (!courseFilePath) {
            return res.status(404).send({
              message: " Course image is required"
            })  
          }
          const courseImage = await uploadOnCloudinary(avatarLocalPath);

    if (!courseImage) {
      return res.status(500).send({
        message: "Failed to upload Course Image to Cloudinary",
        success: false
      });
    }
    
        const course = await Course.create({ title, description, price, createdBy: req.user.id, author: author , imageOfProduct: courseImage.url});
        res.status(201).send({
            message: "Course created successfully",
            course,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export async function updateCourse(req, res) {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin privileges required.",
                success: false
            });
        }

        const { id } = req.params; 
        const { title, description, price, author } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            id,
            { title, description, price, author },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                message: "Course not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Course updated successfully",
            course: updatedCourse,
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export async function deleteCourse(req,res){
 
    try {
        const {id} = req.params;
        const signedInUser = req.user;
        if(signedInUser.role!== "admin"){
            return res.status(403).json({
                message: "You dont have access to delete the course only admin can do",
                success: false,
            })
        }
        const course = await Course.findById(id);
        if(!course){
            return res.status(404).json({
                message: "Course doesnt exist",
                success: false
            })
        }
      await course.deleteOne()
       return res.send({
            message: "Course deleted",
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export async function addCourse(req,res){
    try {
        const {id} = req.params;
        const signedInUser = req.user;
        const course = await Course.findById(id);
        if(!course){
            return res.status(404).send({
                message: "Course doesn't exist",
                success: false
            })
        }
        const user = await User.findById(signedInUser.id);
        if (!user) {
          return res.status(404).send({
            message: "User not found",
            success: false
          });
        }
        if (user.enrolledCourses.includes(course._id)) {
            return res.status(400).send({
              message: "Course already added",
              success: false
            });
          }
      
    
    

        user.enrolledCourses.push(course);
        await user.save()
        return res.send({
            message: "Course added",
            success: true,
            enrolledCourses: user.enrolledCourses
        })

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}