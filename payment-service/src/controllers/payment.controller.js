import asyncHandler from "../middleware/async";
import { makeResponse } from "../utils/response";
import {
  createPaymentService,
  updatePaymentService,
} from "../services/payment.service.js";

// create payment controller
export const makePayment = asyncHandler(async (req, res) => {
  // call create payment service
  const result = await createPaymentService(req.body);
  if (result)
    return makeResponse({
      res,
      statusCode: 201,
      data: {
        message: "Payment successful",
        data: result,
      },
    });
});
// update payment controller
export const updatePayment = asyncHandler(async (req, res) => {
  // call update payment service
  const result = await updatePaymentService(req.params, req.body);
  if (result)
    return makeResponse({
      res,
      statusCode: 200,
      data: {
        message: "Payment updated successfully",
        data: result,
      },
    });
});
