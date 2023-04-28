const Order = require("../models/order.model");

const saveOrder = async (order) => {
  return await order.save();
};

const getAllOrders = async () => {
  return await Order.find().sort({ orderDate: -1 });
};

const getOrderByOrderId = async (orderId) => {
  return await Order.findOne({ orderId: orderId });
};

const deleteOrder = async (order) => {
  return await order.deleteOne();
};

module.exports = {
  saveOrder,
  getAllOrders,
  getOrderByOrderId,
  deleteOrder,
};
