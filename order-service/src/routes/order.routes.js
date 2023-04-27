const express = require("express");
import { adminProtect, protect } from "../middleware/auth.js";
const {createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder} = require("../controllers/order.controller");
const orderRouter = express.Router();

//order get all route
orderRouter.route("/getAllOrders").get(protect, adminProtect, getAllOrders);
//order get by id route
orderRouter.route("/").post(protect, createOrder).get(protect, getAllOrders);
//order get by id route
orderRouter.route("/:orderId").get(protect, getOrderById).put(protect, updateOrderStatus).delete(protect, deleteOrder);
//order update status route
orderRouter.route("/updateOrderStatus/:orderId").put(protect, adminProtect, updateOrderStatus);

export default orderRouter;