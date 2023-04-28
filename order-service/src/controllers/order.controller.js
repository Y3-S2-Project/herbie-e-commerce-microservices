import asyncHandler from "../middleware/async";
import { makeResponse } from "../utils/response";
import {
  createOrderService,
  getAllOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
  deleteOrderService,
} from "../services/order.services";

// create order controller
export const createOrderController = asyncHandler(async (req, res) => {
  const response = await createOrderService(req.body);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not create the order",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Order created successfully",
  });
});

// get order by id controller
export const getOrderByIdController = asyncHandler(async (req, res) => {
  const response = await getOrderByIdService(req.params.order_id);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not retrieve the order",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Order retrieved successfully",
  });
});

// get orders controller
export const getOrdersController = asyncHandler(async (req, res) => {
  console.log("req params: ", req.query);
  const response = await getAllOrdersService(req.query);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not retrieve the orders",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Orders retrieved successfully",
  });
});

// update order status controller
export const updateOrderStatusController = asyncHandler(async (req, res) => {
  const response = await updateOrderStatusService(
    req.params.order_id,
    req.body
  );
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not update the order status",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Order status updated successfully",
  });
});
