const express = require("express");
import { adminProtect, protect } from "../middleware/auth.js";
const {createOrderController, getOrdersController, getOrderByIdController, updateOrderStatusController, deleteOrder} = require("../controllers/order.controller");
const orderRouter = express.Router();

//order get all route
orderRouter.route("/getAllOrders").get(protect, adminProtect, getOrdersController);
//order get by id route
orderRouter.route("/").post(protect, createOrderController).get(protect, getOrdersController);
//order get by id route
orderRouter.route("/:orderId").get(protect, getOrderByIdController).put(protect, updateOrderStatusController).delete(protect, deleteOrder);
//order update status route
orderRouter.route("/updateOrderStatus/:orderId").put(protect, adminProtect, updateOrderStatusController);

export default orderRouter;