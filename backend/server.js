import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/userRoutes.js"
import connectDb from "./model/db.js";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config()
app.use(express.json())
app.use(cookieParser())
const PORT = process.env.PORT || 5000;
console.log(PORT);



app.use("/api/v1/user",userRoutes)
app.use("/api/v1/product",productRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running http://localhost:${PORT}`)
    connectDb()
})