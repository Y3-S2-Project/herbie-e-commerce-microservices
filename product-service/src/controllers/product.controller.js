import Product from "../models/product.model";
import Seller from "../models/seller.model";
import asyncHandler from "../middleware/async.js";

import { makeResponse } from "../utils/response";
import {
  getAllProductOnSaleService,
  createSellerProductService,
  deleteProductService,
  updateProductService,
  updateVisibleStatusService,
  getAllProductsService,
  getSingleProductService,
} from "../services/product.service.js";

export const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // get all products
    let result = null;
    // if user is logged in and is a seller, get only his products
    if (req?.user) {
      result = await getAllProductsService(req?.user?.seller._id);
      // if user is not logged in, get all products
    } else result = await getAllProductsService();
    // if products are found, return them
    if (result?.status == 200) {
      return makeResponse({
        res,
        status: 200,
        data: result.data,
        success: "All Products",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error retrieving product" });
  }
});

export const postAddProduct = asyncHandler(async (req, res) => {
  const { seller } = req.user;
  console.log(seller._id);
  try {
    const result = await createSellerProductService(req.body, seller._id);

    if (result?.status == 201)
      return res.status(201).json({ success: "Product created successfully" });
  } catch (err) {
    console.log(err);
    // handle any errors that occur
    return res.status(500).json({ error: "Error creating product" });
  }
});

export const getDeleteProduct = asyncHandler(async (req, res) => {
  // get the seller from the request object
  const { seller } = req.user;
  console.log(seller);
  // get the product id from the request params
  const { id } = req.params;

  try {
    // find the product by id and delete it
    const result = await deleteProductService(seller._id, id);
    if (result.status == 500) {
      // once the product is deleted successfully, remove it from the seller's product list
      return res.status(500).json({ error: "Error updating seller" });
    } else if (result.status == 200) {
      return res.status(200).json({ success: "Product deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    // handle any errors that occur
    return res.status(500).json({ error: "Error deleting product" });
  }
});

export const editProduct = asyncHandler(async (req, res) => {
  try {
    // find the product by id and update it
    let productToBeEdited = {
      pName: req.body.pName,
      pDescription: req.body.pDescription,
      pStatus: req.body.pStatus,
      pCategory: req.body.pCategory,
      pQuantity: req.body.pQuantity,
      pPrice: req.body.pPrice,
      pOffer: req.body.pOffer,
      pWeight: req.body.pWeight,
      pImages: req.body.pImages,
    };

    const result = await updateProductService(req.body.pPid, productToBeEdited);
    if (result?.status == 201) {
      // return a success response with the updated product object
      return res.json({
        success: "Product edit successfully",
        product: result?.data,
      });
    } else if (result?.status == 404) {
      return res.status(404).json({ error: "Product not found" });
    } else if (result?.status == 500) {
      return res.status(500).json({ error: "Error Editing product" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error editing product" });
  }
});

export const getAllProductOnSale = asyncHandler(async (req, res) => {
  try {
    // get all products where sale state is true
    let result = await getAllProductOnSaleService();
    // if products are found, return them
    if (result.status == 200) {
      makeResponse({
        res,
        status: 200,
        data: result.data,
        success: "All Products",
      });
    } else if (result?.status == 404) {
      res.status(404).json({ error: "No on sale products" });
    } else if (result?.status == 500) {
      res.status(500).json({ error: "Error finding products" });
    }
  } catch (err) {
    console.log(err);
  }
});

export const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    // get the product with the specified pPid
    let result = await getSingleProductService(req.params.id);
    if (result?.status == 200) {
      makeResponse({
        res,
        status: 200,
        data: result.data,
        success: "All Products",
      });
    } else if (result?.status == 404) {
      res.status(404).json({ error: "No on sale products" });
    } else if (result?.status == 500) {
      res.status(500).json({ error: "Error finding products" });
    }
  } catch (err) {
    console.log(err);
  }
});

//update visible status
export const updateVisibleStatus = asyncHandler(async (req, res) => {
  try {
    // Find the product with the specified pPid
    let result = await updateVisibleStatusService(req.body.pPid);

    // If the product exists, update its pVisible field to true
    if (result?.status == 200) {
      makeResponse({
        res,
        status: 200,
        data: result.data.data,
        success: "Product updated successfully",
      });
    } else if (result?.status == 404) {
      makeResponse({
        res,
        status: 404,
        error: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating product" });
  }
});
