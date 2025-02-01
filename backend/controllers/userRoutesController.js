import asyncHandler from "./middleware.js";
import { z } from "zod";
import { User } from "../model/dbModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  phNumber: z.number().min(10, { message: "Ph number must be of 10 numbers" }),
  password: z.string(),
});

export const register = asyncHandler(async (req, res) => {
  const { success } = registerSchema.safeParse(req.body);
  if (!success) {
    throw new Error("Invalid input types");
  } else {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("user already exists");
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
      { id: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, { maxAge: 2592000000, httpOnly: true });
    res.json({ response: "user has been created" });
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
    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      throw new Error("Invalid Email or Password");
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, { maxAge: 2592000000, httpOnly: true });
    res.json({ response: "user has sucessfully loged In" });
  }
});

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.json({ response: "logut sucessfully" });
};
