import express from "express";
import { v4 as uuidv4 } from "uuid";

import {
  getAllProduct,
  postAddProduct,
  editProduct,
  getDeleteProduct,
  getAllProductOnSale,
  getSingleProduct,
  updateVisibleStatus,
} from "../controllers/product.controller";
import { protect, adminProtect, sellerProtect } from "../middleware/auth.js";

const productRouter = express.Router();
// get all products route
productRouter.get("/all-product", getAllProduct);
//get all products of a seller
productRouter.get("/seller/all-product", protect, sellerProtect, getAllProduct);
// add a product route
productRouter.post("/add-product", protect, sellerProtect, postAddProduct);
// edit a product route
productRouter.post(
  "/seller/edit-product",
  protect,
  sellerProtect,
  editProduct
);
// get all products on sale route
productRouter.get("/all-product-onsale", getAllProductOnSale);
// delete a product route
productRouter.delete(
  "/delete-product/:id",
  protect,
  sellerProtect,
  getDeleteProduct
);
// get a single product route
productRouter.get("/single-product/:id", getSingleProduct);
// update visible status of a product route
productRouter.patch(
  "/admin/confirm-product",
  protect,
  adminProtect,
  updateVisibleStatus
);
export default productRouter;
