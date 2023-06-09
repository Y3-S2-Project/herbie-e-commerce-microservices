import Order from "../models/order.model.js";
import asyncHandler from "../middleware/async.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
//Create new order
const createOrder = asyncHandler(async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const orderCount = await Order.count();
    newOrder.orderId = "OID00" + (parseInt(orderCount) + 1);
    try {
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    console.log(err);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {

  const orderId = req.query?.orderId || null;
  try {
    let orders;
    if (orderId) {
      orders = await Order.find({ orderId });
    } else {
      orders = await Order.find();
    }

    const ordersArray = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i].toObject();
      const userId = order.userId;

      const user = await User.findById(userId);
      order.userId = user?.toObject();

      const products = order.products;
      const newProducts = [];

      for (let j = 0; j < products.length; j++) {
        const product = await Product.findById(products[j].product);
        newProducts.push({
          product: product?.toObject(),
          quantity: products[j].quantity,
        });
      }

      order.products = newProducts;

      ordersArray.push(order);
    }

    res.status(200).json(ordersArray);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//Get order by order id
const getOrderById = asyncHandler(async (req, res) => {
  console.log(req.params.orderId);
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    console.log(order);
    if (order) {
      const products = await Promise.all(
        order.products.map(async (item) => {
          const product = await Product.findById(item.product);
          return { product, quantity: item.quantity };
        })
      );

      res.status(200).json({ ...order.toJSON(), products });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update order status
const updateOrderStatus = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (order) {
      order.orderStatus = req.body.orderStatus;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete order
const deleteOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (order) {
      await order.remove();
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get total sales
const getTotalSales = asyncHandler(async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
    ]);
    if (!totalSales) {
      res.status(400).json({ message: "The order sales cannot be generated" });
    } else {
      res.status(200).json({ totalSales: totalSales.pop().totalSales });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getTotalSales,
};
