import express from "express";
// import { protect, adminProtect } from "../middleware/auth";
import {
  getAllReviewsController,
  createProductReviewController,
  deleteProductReviewController,
  updateProductReviewController,
  createSellerReviewController,
  deleteSellerReviewController,
  updateSellerReviewController,
  getReviewByIdController,
  getReviewsController,
} from "../controllers/review.controller";

const userRouter = express.Router();

// get all reviews route 
userRouter.get("/", getAllReviewsController);
// get reviews route
userRouter.get("/read-reviews/", getReviewsController);
// get a review by id route
userRouter.get("/:review_id", getReviewByIdController);

// create a product review route
userRouter.post("/products/create", createProductReviewController);
// create a seller review route
userRouter.post("/sellers/create", createSellerReviewController);

// delete a product review route
userRouter.delete("/products/delete/:review_id", deleteProductReviewController);
// delete a seller review route
userRouter.delete("/sellers/delete/:review_id", deleteSellerReviewController);
// update a product review route
userRouter.put("/products/update/:user_id", updateProductReviewController);
// update a seller review route
userRouter.put("/sellers/update/:user_id", updateSellerReviewController);

export default userRouter;