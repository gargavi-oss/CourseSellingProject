import express from "express"
import cors from "cors"
import userRoutes from "./routes/users.routes.js"
import courseRoutes from "./routes/courses.routes.js"

const app = express()

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/",(req,res)=>{
    res.send("hello")
})
app.use("/api/v1",userRoutes);
app.use("/api/v1",courseRoutes)

export {app}