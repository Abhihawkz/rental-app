import asyncHandler from "./middleware.js";
import { z } from "zod";
import { Product, Rental } from "../model/dbModel.js";

const productSchema = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  price: z.number(),
  available: z.boolean(),
});

export const add = asyncHandler(async (req, res) => {
  const { success } = productSchema.safeParse(req.body);
  if (!success) {
    throw new Error("Invalid input types");
  }
  const product = await Product.findOne({ name: req.body.name });
  if (product) {
    throw new Error("Product already Exists");
  }
  const newProduct = await Product.create({
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    available: req.body.available,
  });
  res.json({ response: "Product Sucessfully Added", Product: newProduct });
});

const editSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  available: z.boolean().optional(),
});

export const edit = asyncHandler(async (req, res) => {
  const { success } = editSchema.safeParse(req.body);
  if (!success) {
    throw new Error("Invalid input types");
  }
  const id = req.body.id;
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new Error("Product not found to edit");
  }
  await Product.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name: req.body.name || product.name,
      image: req.body.image || product.image,
      description: req.body.description || product.description,
      price: req.body.price || product.price,
      available: req.body.available || product.available,
    }
  );
  res.status(200).json({ response: "Product Details Edited sucessfully" });
});

export const getAll = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json({ response: products });
});

export const del = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    throw new Error("cannot delete the poduct invalid id");
  }
  await Product.findOneAndDelete({ _id: id });
  res.json({ response: "Product Deleted Sucessfully" });
});

export const getOne = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ _id: id });
  res.json({ respnose: product });
});

export const rent = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const product = await Product.findOne({ _id: req.body.id });

  const rentalPeriodInDays = (end - start) / (1000 * 60 * 60 * 24);

  const totalPrice = rentalPeriodInDays * product.price;

  await Rental.create({
    product: product._id,
    startDate: start,
    endDate: end,
    user: req.user,
    totalPrice,
  });
  res.json({ response: "Rented the producted" });
});

export const userRented = asyncHandler(async (req, res) => {
  const rented = await Rental.find({ user: req.user })
    .populate("product")
    .select("-user");
  if (!rented) {
    res.json({ respones: "you havent rented anything" });
  } else {
    res.json({ products: rented });
  }
});
