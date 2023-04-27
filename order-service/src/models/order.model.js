import mongoose from "mongoose";
import userSchema from "./models/user.model.js";
import productSchema from "./models/product.model.js";

// Register the schemas
mongoose.model("User", userSchema);
mongoose.model("Product", productSchema);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Reference to the product model
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    orderStatus: {
      type: String,
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      default: "Paid",
    },
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
