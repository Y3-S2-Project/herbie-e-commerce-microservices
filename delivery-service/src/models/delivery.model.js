import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    deliveryId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryDate: {
      type: Date,
    },
    deliveryStatus: {
      type: String,
      default: "Pending",
    },
    contactNo: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      houseNo: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      province: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;
