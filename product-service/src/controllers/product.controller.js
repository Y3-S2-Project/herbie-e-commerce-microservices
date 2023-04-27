import Product from "../models/product.model";
import Seller from "../models/seller.model";
import asyncHandler from "../middleware/async.js";
import { v4 as uuidv4 } from "uuid";
import { makeResponse } from "../utils/response";

export const getAllProduct = asyncHandler(async (req, res) => {

  try {
    // get all products
    let Products = null;
    // if user is logged in and is a seller, get only his products
    if (req?.user) {
      Products = await Product.find({ pSeller: req?.user?.seller._id }).sort({
        _id: -1,
      });
      // if user is not logged in, get all products
    } else Products = await Product.find().sort({ _id: -1 });
    // if products are found, return them
    if (Products) {
      makeResponse({
        res,
        status: 200,
        data: Products,
        success: "All Products",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

export const getProductCount = async () => {
  try {
    // get all products count
    let count = await Product.count();
    return count;
  } catch (err) {
    console.log(err);
  }
};

export const postAddProduct = asyncHandler(async (req, res) => {
  const { seller } = req.user;

  // create a new product object with any relevant data
  const newProduct = new Product({
    pPid: `PID${uuidv4()}`,
    pName: req.body.pName,
    pDescription: req.body.pDescription,
    pStatus: req.body.pStatus,
    pCategory: req.body.pCategory,
    pQuantity: req.body.pQuantity,
    pPrice: req.body.pPrice,
    pOffer: req.body.pOffer,
    pWeight: req.body.pWeight,
    pImages: req.body.pImages,
    pSeller: seller._id,
 
  });
  try {
    // save the new product
    const product = await new Product(newProduct).save();
    if (product) {
      // once the new product is saved successfully, add it to the seller's product list
      Seller.findOneAndUpdate(
        { _id: seller._id },
        { $push: { products: newProduct._id } },
        { new: true },
        (err, updatedSeller) => {
          if (err) {
            console.log(err);
            // handle any errors that occur
            return res.status(500).json({ error: "Error updating seller" });
          }

          // return a success response with the updated seller object
          return res
            .status(200)
            .json({ success: "Product created successfully" });
        }
      );
    }
  } catch (err) {
    console.log(err);
    // handle any errors that occur
    return res.status(500).json({ error: "Error creating product" });
  }
});

export const getDeleteProduct = asyncHandler(async (req, res) => {
  // get the seller from the request object
  const { seller } = req.user;
  // get the product id from the request params
  const { id } = req.params;

  try {
    // find the product by id and delete it
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      // once the product is deleted successfully, remove it from the seller's product list
      Seller.findOneAndUpdate(
        { _id: seller._id },
        { $pull: { products: id } },
        { new: true },
        (err, updatedSeller) => {
          if (err) {
            console.log(err);
            // handle any errors that occur
            return res.status(500).json({ error: "Error updating seller" });
          }

          // return a success response with the updated seller object
          return res
            .status(200)
            .json({ success: "Product deleted successfully" });
        }
      );
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
    const productToBeEdited = await Product.findOne({ pPid: req.body.pPid });
    if (productToBeEdited) {
      productToBeEdited.pName = req.body.pName;
      productToBeEdited.pDescription = req.body.pDescription;
      productToBeEdited.pStatus = req.body.pStatus;
      productToBeEdited.pCategory = req.body.pCategory;
      productToBeEdited.pQuantity = req.body.pQuantity;
      productToBeEdited.pPrice = req.body.pPrice;
      productToBeEdited.pOffer = req.body.pOffer;
      productToBeEdited.pWeight = req.body.pWeight;
      productToBeEdited.pImages = req.body.pImages;

      const updatedProduct = await productToBeEdited.save();
 // return a success response with the updated product object
      return res.json({
        success: "Product edit successfully",
        product: updatedProduct,
      });
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error editing product" });
  }
});

export const getAllProductOnSale = asyncHandler(async (req, res) => {
  try {
    // get all products where sale state is true
    let Products = await Product.find({ pSaleStatus: true }).sort({ _id: -1 });
   // if products are found, return them
    if (Products) {
      makeResponse({
        res,
        status: 200,
        data: Products,
        success: "All Products",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

export const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    // get the product with the specified pPid
    let Products = await Product.find({ pPid: req.params.id });
    if (Products) {
      makeResponse({
        res,
        status: 200,
        data: Products,
        success: "All Products",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//update visible status
export const updateVisibleStatus = asyncHandler(async (req, res) => {

  try {
    // Find the product with the specified pPid
    let product = await Product.findOne({ pPid: req.body.pPid });

    // If the product exists, update its pVisible field to true
    if (product) {
      // Update the product's pVisible field
      product.pVisible = true;
      // Save the updated product
      let updatedProduct = await product.save();
      makeResponse({
        res,
        status: 200,
        data: updatedProduct,
        success: "Product updated successfully",
      });
    } else {
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
