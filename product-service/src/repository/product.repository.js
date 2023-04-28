import Product from "../models/product.model";
import Seller from "../models/seller.model";
import asyncHandler from "../middleware/async";
import { v4 as uuidv4 } from "uuid";

export const getAllProductsRepository = async (userId) => {
  try {
    // get all products
    let Products = null;
    // if user is logged in and is a seller, get only his products
    if (userId) {
      Products = await Product.find({ pSeller: userId }).sort({
        _id: -1,
      });
      // if user is not logged in, get all products
    } else Products = await Product.find().sort({ _id: -1 });
    // if products are found, return them
    if (Products) {
      return {
        status: 200,
        data: Products,
        success: "All Products",
      };
    } else {
      return {
        status: 404,
        error: "Products not found",
      };
    }
  } catch (err) {
    console.log(err);
  }
};
export const getProductCount = async () => {
  try {
    // get all products count
    let count = await Product.count();
    return count;
  } catch (err) {
    console.log(err);
  }
};
export const createProductRepository = async (ProductData, sellerId) => {
  // create a new product object with any relevant data
  ProductData.pPid = `PID${uuidv4()}`;
  ProductData.pSeller = sellerId;
  if (ProductData.pOffer > 0) ProductData.pSaleStatus = true;
  try {
    // save the new product
    const product = await new Product(ProductData).save();
    if (product) {
      // once the new product is saved successfully, add it to the seller's product list
      Seller.findOneAndUpdate(
        { _id: sellerId },
        { $push: { products: product._id } },
        { new: true },
        (err, updatedSeller) => {
          if (err) {
            console.log(err);
            // handle any errors that occur
            return { status: 500, error: "Error updating seller" };
          }

          // return a success response with the updated seller object
          return { status: 201, success: "Product created successfully" };
        }
      );
      return { status: 201, success: "Product created successfully" };
      console.log(product);
    }
  } catch (err) {
    console.log(err);
    // handle any errors that occur
    return { status: 500, error: "Error creating product" };
  }
};

export const getDeleteProductRepository = async (sellerId, productId) => {
  try {
    console.log(sellerId, productId);
    // find the product by id and delete it
    const product = await Product.findByIdAndDelete(productId);
    if (product) {
      // once the product is deleted successfully, remove it from the seller's product list
      Seller.findOneAndUpdate(
        { _id: sellerId },
        { $pull: { products: productId } },
        { new: true },
        (err, updatedSeller) => {
          if (err) {
            console.log(err);
            // handle any errors that occur
            return { status: 500, error: "Error updating seller" };
          }

          // return a success response with the updated seller object
          return {
            status: 200,

            success: "Product deleted sucessfully",
          };
        }
      );
    }
    return {
      status: 200,

      success: "Product deleted sucessfully",
    };
  } catch (err) {
    console.log(err);
    // handle any errors that occur
    return { status: 500, error: "Error deleting product" };
  }
};

export const getAllProductOnSaleRepository = async () => {
  try {
    // get all products where sale state is true
    let Products = await Product.find({
      pSaleStatus: true,
      pVisible: true,
    }).sort({ _id: -1 });
    // if products are found, return them
    if (Products) {
      return {
        status: 200,
        data: Products,
        success: "All Products",
      };
    } else {
      return {
        status: 404,
        error: "No on sale products",
      };
    }
  } catch (err) {
    console.log(err);

    return {
      status: 500,
      error: "Error finding products",
    };
  }
};
export const editProductRepository = async (pPid, productData) => {
  try {
    // find the product by id and update it
    const productToBeEdited = await Product.findOne({ pPid: pPid });
    if (productToBeEdited) {
      productToBeEdited.pName = productData.pName;
      productToBeEdited.pDescription = productData.pDescription;
      productToBeEdited.pStatus = productData.pStatus;
      productToBeEdited.pCategory = productData.pCategory;
      productToBeEdited.pQuantity = productData.pQuantity;
      productToBeEdited.pPrice = productData.pPrice;
      productToBeEdited.pOffer = productData.pOffer;
      productToBeEdited.pWeight = productData.pWeight;
      productToBeEdited.pImages = productData.pImages;

      const updatedProduct = await productToBeEdited.save();
      // return a success response with the updated product object
      return {
        success: "Product edit successfully",
        product: updatedProduct,
        status: 201,
      };
    } else {
      return { status: 404, error: "Product not found" };
    }
  } catch (err) {
    console.log(err);
    return { status: 500, error: "Error editing product" };
  }
};
export const getSingleProductRepository = async (pPid) => {
  try {
    // get the product with the specified pPid
    let Products = await Product.find({ pPid: pPid });
    if (Products) {
      return {
        status: 200,
        data: Products,
        success: "All Products",
      };
    } else {
      return { status: 404, error: "Product not found" };
    }
  } catch (err) {
    return { status: 500, error: "Error editing product" };
  }
};

//update visible status
export const updateVisibleStatusRepository = async (pPid) => {
  try {
    // Find the product with the specified pPid
    let product = await Product.findOne({ pPid: pPid });

    // If the product exists, update its pVisible field to true
    if (product) {
      // Update the product's pVisible field
      product.pVisible = true;
      // Save the updated product
      let updatedProduct = await product.save();
      return {
        status: 200,
        data: updatedProduct,
        success: "Product updated successfully",
      };
    } else {
      return {
        status: 404,
        error: "Product not found",
      };
    }
  } catch (error) {
    return { status: 500, error: "Error editing product" };
  }
};
