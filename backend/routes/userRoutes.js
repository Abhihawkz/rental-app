import { Router } from "express";
import {
  login,
  logout,
  register,
} from "../controllers/userRoutesController.js";
import { userMiddleware } from "./middleware.js";

const router = Router();

router.post("/register",register);

router.post("/login", login);

router.post("/logout",userMiddleware,logout);

export default router;
