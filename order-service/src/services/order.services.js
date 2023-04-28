const Order = require("../models/order.model");
const Product = require("../models/product.model");
const User = require("../models/user.model");
const orderRepository = require("../repository/order.repository");
const productRepository = require("../repository/product.repository");
const userRepository = require("../repository/user.repository");

const createOrderService = async (orderData) => {
  // create a new order
  const newOrder = new Order(orderData);
  try {
    // get the current highest order ID from the database
    const orderCount = await orderRepository.count();
    newOrder.orderId = "OID00" + (parseInt(orderCount) + 1);
    try {
      // save the order to the database
      const savedOrder = await orderRepository.saveOrder(newOrder);
      return savedOrder;
    } catch (err) {
      console.log(err);
      throw new Error("Error while saving order to database");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error while creating order");
  }
};

const getAllOrdersService = async (orderId) => {
  try {
    // get all orders from the database
    let orders;
    if (orderId) {
      orders = await orderRepository.getOrderByOrderId(orderId);
    } else {
      orders = await orderRepository.getAllOrders();
    }

    const ordersArray = [];

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i].toObject();
      const userId = order.userId;

      const user = await userRepository.getUserById(userId);
      order.userId = user?.toObject();

      const products = order.products;
      const newProducts = [];

      for (let j = 0; j < products.length; j++) {
        const product = await productRepository.getProductById(
          products[j].product
        );
        newProducts.push({
          product: product?.toObject(),
          quantity: products[j].quantity,
        });
      }

      order.products = newProducts;

      ordersArray.push(order);
    }

    return ordersArray;
  } catch (err) {
    console.log(err);
    throw new Error("Error while getting orders from database");
  }
};

const getOrderByIdService = async (orderId) => {
  try {
    // get order by order ID
    const order = await orderRepository.getOrderByOrderId(orderId);
    if (order) {
      const products = await Promise.all(
        order.products.map(async (item) => {
          const product = await productRepository.getProductById(item.product);
          return { product, quantity: item.quantity };
        })
      );
      const orderObject = order.toObject();
      orderObject.products = products;
      return orderObject;
    } else {
      throw new Error("Order not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error while getting order by ID from database");
  }
};

const updateOrderStatusService = async (orderId, orderStatus) => {
  try {
    // update order status
    const order = await orderRepository.getOrderByOrderId(orderId);
    if (order) {
      order.orderStatus = orderStatus;
      const updatedOrder = await orderRepository.saveOrder(order);
      return updatedOrder;
    } else {
      throw new Error("Order not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error while updating order status in database");
  }
};

const deleteOrderService = async (orderId) => {
  try {
    // delete order
    const order = await orderRepository.getOrderByOrderId(orderId);
    if (order) {
      await orderRepository.deleteOrder(order);
      return true;
    } else {
      throw new Error("Order not found");
    }
  } catch (err) {
    console.log(err);
    throw new Error("Error while deleting order from database");
  }
};

module.exports = {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  deleteOrderService,
};
