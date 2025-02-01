import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require,
    },
    email: {
      type: String,
      require,
    },
    phNumber: {
      type: Number,
      require,
    },
    password: {
      type: Number,
      require,
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
      require,
    },
    description: {
      type: String,
      require,
    },
    price: {
      type: Number,
      require,
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
      require,
    },
    totalPrice: {
      type: Number,
    },user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    }
  },
  { timestamps: true }
);

rentalSchema.pre("save", function (next) {
  const rentalPeriodInDays =
    (this.endDate - this.startDate) / (1000 * 60 * 60 * 24);
  this.totalPrice = rentalPeriodInDays * this.product.pricePerDay;
  next();
});

const User = mongoose.model('Users',userSchema);
const Product = mongoose.model('Products',productSchema);
const Rental = mongoose.model('Rental',rentalSchema);

export { User,Product,Rental}