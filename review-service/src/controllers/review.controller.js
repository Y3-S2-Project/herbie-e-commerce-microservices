import asyncHandler from "../middleware/async";
import { makeResponse } from "../utils/response";
import {
  getAllReviewsService,
  createProductReviewService,
  deleteProductReviewService,
  updateProductReviewService,
  createSellerReviewService,
  deleteSellerReviewService,
  updateSellerReviewService,
  getReviewByIdService,
  getReviewsService,
} from "../services/review.services";

// get all reviews controller
export const getAllReviewsController = asyncHandler(async (req, res) => {
  const reviews = await getAllReviewsService();
  return makeResponse({
    res,
    status: 200,
    data: reviews,
    message: "Reviews retrieved succesfully",
  });
});
// get a review by id controller
export const getReviewByIdController = asyncHandler(async (req, res) => {
  const response = await getReviewByIdService(req.params.review_id);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not retrieve the review",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Review retrieved succesfully",
  });
});

// get reviews controller
export const getReviewsController = asyncHandler(async (req, res) => {
  console.log("req params: ", req.query);
  const response = await getReviewsService(req.query);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not retrieve the reviews",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Reviews retrieved succesfully",
  });
});
// create product review controller
export const createProductReviewController = asyncHandler(async (req, res) => {
  const response = await createProductReviewService(req.body);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not create the product review",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Product Review created succesfully",
  });
});
// create seller review controller
export const createSellerReviewController = asyncHandler(async (req, res) => {
  const response = await createSellerReviewService(req.body);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not create the seller review",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Seller Review created succesfully",
  });
});
// delete product review controller
export const deleteProductReviewController = asyncHandler(async (req, res) => {
  const response = await deleteProductReviewService(req.params.review_id);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not delete the product review",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Product Review deleted succesfully",
  });
});
// delete seller review controller
export const deleteSellerReviewController = asyncHandler(async (req, res) => {
  const response = await deleteSellerReviewService(req.params.review_id);
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not delete the seller review",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Seller Review deleted succesfully",
  });
});
// update product review controller
export const updateProductReviewController = asyncHandler(async (req, res) => {
  const response = await updateProductReviewService(
    req.params.user_id,
    req.body
  );
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not update the product review",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Product Review updated succesfully",
  });
});
// update seller review controller
export const updateSellerReviewController = asyncHandler(async (req, res) => {
  const response = await updateSellerReviewService(
    req.params.user_id,
    req.body
  );
  if (!response)
    return makeResponse({
      res,
      status: 500,
      message: "Could not update the seller review",
    });
  if (response.status) return makeResponse({ res, ...response });
  return makeResponse({
    res,
    status: 200,
    data: response.data,
    message: "Seller Review updated succesfully",
  });
});

