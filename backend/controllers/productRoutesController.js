import asyncHandler from "../routes/middleware.js";
import { Product, Rental } from "../model/dbModel.js";
import { v2 as cloudinary } from "cloudinary";

export const add = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body;
  const existingProduct = await Product.findOne({ name });
  if (existingProduct) {
    return res.status(400).json({ message: "Product already exists" });
  }

  let imageUrl = null;
  if (req.file) {
    if (!cloudinary.config().cloud_name) {
      return res
        .status(500)
        .json({ message: "Cloudinary is not configured properly" });
    }

    try {
      if (!req.file.path) {
        return res
          .status(400)
          .json({ message: "No file path found in request" });
      }

      const uploadResponse = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResponse.secure_url;
    } catch (error) {
      console.log("Error uploading to Cloudinary:", error);
      return res.status(500).json({
        message: "Error uploading image to Cloudinary",
        error: error.message,
      });
    }
  }

  const newProduct = new Product({
    name,
    description,
    price: Number(price),
    image: imageUrl,
    available: true,
  });

  try {
    const savedProduct = await newProduct.save();
    res
      .status(200)
      .json({ message: "Product successfully added", product: savedProduct });
  } catch (error) {
    console.log("Error saving product:", error);
    res
      .status(500)
      .json({ message: "Error saving product", error: error.message });
  }
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
  res.json({ products: products });
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
