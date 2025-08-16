
import { app } from "./app.js";
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";
import {v2 as cloudinary} from "cloudinary"



const PORT = process.env.PORT || 3000;

dotenv.config(
    {
        path: "./.env"
    }
)
cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
)

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is listening at ${PORT}`)
    })
})
.catch((err)=>{
    console.log(`MongoDB Connection failed : ${err}`)
})

export default cloudinary