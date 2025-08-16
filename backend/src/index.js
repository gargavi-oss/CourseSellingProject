
import { app } from "./app.js";
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";

const PORT = process.env.PORT || 3000;

dotenv.config(
    {
        path: "./.env"
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