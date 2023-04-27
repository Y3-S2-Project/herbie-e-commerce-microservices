const express = require('express');
import { buyerProtect, protect } from "../middleware/auth.js";
const {
  createCart,
  getCartByUserId,
  updateCart,
  deleteCart,
  deleteProductFromCart,
  getTotalPrice,
  getCartCount,
} = require("../controllers/cart.controller");
const cartRouter = express.Router();
// cart route to create a cart
cartRouter.route("/").post(protect, createCart);

// cart route to get cart by userId
// cart route to update cart
// cart route to delete product from cart
cartRouter
  .route("/:userId")
  .get(protect, getCartByUserId)
  .put(protect, updateCart)
  .delete(protect, deleteCart);
// cart route todelete product from cart
cartRouter.route('/:userId/:productId').delete(protect, deleteProductFromCart);
// cart route to get total price
cartRouter.route('/getTotalPrice/:userId').get(protect, buyerProtect, getTotalPrice);
// cart route to get count of products in cart
cartRouter
  .route("/getCartCount/:userId")
  .get(protect, buyerProtect, getCartCount);

export default cartRouter;
