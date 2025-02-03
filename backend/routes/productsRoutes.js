import { Router } from "express";
import { adminMiddleware, uploadImage, userMiddleware } from "./middleware.js";
import {
  add,
  del,
  edit,
  getAll,
  getOne,
  rent,
  userRented,
} from "../controllers/productRoutesController.js";

const router = Router();

router.post("/add", adminMiddleware,uploadImage, add);

router.put("/edit", adminMiddleware, edit);

router.delete("/del", adminMiddleware, del);

router.get("/getAll", userMiddleware, getAll);

router.get("/getOne/:id", userMiddleware, getOne);

router.post("/rent", userMiddleware, rent);

router.get("/userRented", userMiddleware, userRented);

export default router;
