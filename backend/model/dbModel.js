import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required:true,
    },
    email: {
      type: String,
      required:true,
      unique:true,
    },
    phNumber: {
      type: Number,
      required:true,
      unique:true,
    },
    password: {
      type: String,
      required:true,
    },
    role: {
      type:String,
      enum: ["admin","user"],
      default: "user",
    },
  },
  { timestamps: true }
);
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required:true,
    },
    price: {
      type: Number,
      required:true,
    },
    available: {
      type: Boolean,
      default: true,
    },Admin:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Users"
    }
  },
  { timestamps: true }
);

const rentalSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      require: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required:true,
    },
    totalPrice: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);
const Product = mongoose.model("Products", productSchema);
const Rental = mongoose.model("Rental", rentalSchema);

export { User, Product, Rental };
