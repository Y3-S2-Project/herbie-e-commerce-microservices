import {
  getAllReviewsRepository,
  createProductReviewRepository,
  deleteProductReviewRepository,
  updateProductReviewRepository,
  createSellerReviewRepository,
  deleteSellerReviewRepository,
  updateSellerReviewRepository,
  getReviewByIdRepository,
  getReviewsRepository,
} from "../repository/review.repository.js";

export const getAllReviewsService = async () => {
  // get all reviews from the database
  const reviews = await getAllReviewsRepository();
  return reviews;
};
 // get reviews from the database
export const getReviewsService = async (reviewData) => {
 
  return await getReviewsRepository(reviewData);
};
// get a review by id from the database
export const getReviewByIdService = async (review_id) => {
  const review = await getReviewByIdRepository(review_id);
  return review;
};
// create a product review in the database
export const createProductReviewService = async (review) => {
  const { product } = review;
  return await createProductReviewRepository(review, product._id);
};

// create a seller review in the database
export const createSellerReviewService = async (review) => {
  const { seller } = review;
  return await createSellerReviewRepository(review, seller._id);
};
// delete a  product review from the database
export const deleteProductReviewService = async (review_id) => {
  return await deleteProductReviewRepository(review_id);
};
// delete a seller review from the database
export const deleteSellerReviewService = async (review_id) => {
  return await deleteSellerReviewRepository(review_id);
};
// update a product review in the database
export const updateProductReviewService = async (user_id, reviewData) => {
  const { _id } = reviewData;
  return await updateProductReviewRepository(_id, user_id, reviewData);
};
// update a seller review in the database
export const updateSellerReviewService = async (user_id, reviewData) => {
  const { _id } = reviewData;
  return await updateSellerReviewRepository(_id, user_id, reviewData);
};
