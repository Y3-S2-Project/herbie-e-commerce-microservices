import asyncHandler from "../middleware/async";
import { makeResponse } from "../utils/response";

import {
  getAllDeliveryService,
  createDeliveryService,
  getDeliveryByDeliveryIdService,
  updateDeliveryService,
  getDeliveryByIdService,
} from "../services/delivery.services";

// get all delivery controller
export const getAllDeliveryController = asyncHandler(async (req, res) => {
  const reviews = await getAllDeliveryService();
  return makeResponse({
    res,
    status: 200,
    data: reviews,
    message: "Delivery retrieved succesfully",
  });
});
// create delivery controller
export const createDeliveryController = asyncHandler(async (req, res) => {
  const response = await createDeliveryService(req.body);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not create the delivery",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response,
    message: "Delivery created succesfully",
  });
});
// get delivery by delivery id controller
export const getDeliveryByDeliveryIdController = asyncHandler(
  async (req, res) => {
    const response = await getDeliveryByDeliveryIdService(
      req.params.delivery_id
    );
    if (!response)
      return makeResponse({
        res,
        status: 500,
        message: "Could not retrieve the delivery",
      });
    if (response.status) return makeResponse({ res, ...response });
    return makeResponse({
      res,
      status: 200,
      data: response,
      message: "Delivery retrieved succesfully",
    });
  }
);
// update delivery controller
export const updateDeliveryController = asyncHandler(async (req, res) => {
  // call update delivery service
  const response = await updateDeliveryService(req.body);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not update the delivery",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response,
    message: "Delivery updated succesfully",
  });
});
// get delivery by id controller
export const getDeliveryByIdController = asyncHandler(async (req, res) => {
  const response = await getDeliveryByIdService(req.query);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not retrieve the delivery",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Delivery retrieved succesfully",
  });
});
