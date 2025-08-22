import express from "express"
import cors from "cors"
import userRoutes from "./routes/users.routes.js"
import courseRoutes from "./routes/courses.routes.js"
import dotenv from "dotenv"
dotenv.config();  
const app = express()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_DOMAIN, 
    credentials: true,    
  }));  

app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"))


app.use("/api/v1",userRoutes);
app.use("/api/v1",courseRoutes)

export {app}