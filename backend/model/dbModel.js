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
    },
    phNumber: {
      type: Number,
      required:true,
    },
    password: {
      type: String,
      required:true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
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
    },
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
    stratDate: {
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

rentalSchema.pre("save", function (next) {
  const rentalPeriodInDays =
    (this.endDate - this.startDate) / (1000 * 60 * 60 * 24);
  this.totalPrice = rentalPeriodInDays * this.product.pricePerDay;
  next();
});

const User = mongoose.model("Users", userSchema);
const Product = mongoose.model("Products", productSchema);
const Rental = mongoose.model("Rental", rentalSchema);

export { User, Product, Rental };
