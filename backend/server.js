import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import connectDb from "./model/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const PORT = process.env.PORT || 5000;
console.log(PORT);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
  connectDb();
});
