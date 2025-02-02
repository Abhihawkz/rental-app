import { z } from "zod";
import { User } from "../model/dbModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../routes/middleware.js";

const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  phNumber: z.string().min(10, { message: "Ph number must be of 10 numbers" }),
  password: z.string(),
});

export const register = asyncHandler(async (req, res) => {
  const { success } = registerSchema.safeParse(req.body);
  console.log(req.body)
  if (!success) {
    throw new Error("Invalid input types");
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("user already exists");
    }
    const phNumber = await User.findOne({phNumber:req.body.phNumber})
    if(phNumber){
      throw new Error("Phone number already exist")
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      phNumber: req.body.phNumber,
      password: hashedPassword,
    });
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, { maxAge: 2592000000, httpOnly: true });
    res.status(200).json({ message: "Account Created" , user:{username:newUser.username,role:newUser.role}});
  }
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const login = asyncHandler(async (req, res) => {
  const { success } = loginSchema.safeParse(req.body);
  if (!success) {
    throw new Error("Invalid input types");
  } else {
    const user = await User.findOne({ email: req.body.email });
    console.log(user.password)
    console.log(req.body.password)
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      throw new Error("Invalid Email or Password");
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, { maxAge: 2592000000, httpOnly: true });
    res.status(200).json({ message: "User Logged In" , user:{username:user.username,role:user.role} });
  }
});

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "Logut sucessfully" });
};
