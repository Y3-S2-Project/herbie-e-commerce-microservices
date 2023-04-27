import Product from "../models/product.model";
import Seller from "../models/seller.model";


export const getAllProducts= async () => {
  try {
    // find all Products
    const Products = await Product.find({});
    return {
      status: 200,
      data: Products,
      message: "All Products retrieved successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when retrieving all Products - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not retrieve all Products",
    };
  }
};

export const getProductById = async (Product_id) => {
  try {
    // find Product by id
    const Product = await Product.findById(Product_id);
    if (!Product) {
      return {
        status: 404,
        message: "Product not found",
      };
    }
    return {
      status: 200,
      data: Product,
      message: "Product retrieved successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when retrieving a Product by id - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not retrieve the Product",
    };
  }
};

export const getProducts = async (ProductData) => {

  try {
    // find Products by ProductData
    const Products = await Product.find(ProductData)
    if (!Products) {
      return {
        status: 404,
        message: "Products not found",
      };
    }
    return {
      status: 200,
      data: Products,
      message: "Products retrieved successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when retrieving Products - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not retrieve the Products",
    };
  }
};

export const createProduct = async (ProductData) => { 
  try {
    //check if the seller exists
    const newProduct = await Product.create(ProductData);

    await Seller.updateOne(
      { _id: newProduct.seller },
      { $push: { sellerProducts: newProduct._id } }
    );
    return {
      status: 201,
      data: newProduct,
      message: "Seller Product created successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when creating a seller Product - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not create the seller Product",
    };
  }
}



export const deleteProduct= async (Product_id) => {
  try {
    // find Product by id
    const deletedProduct = await Product.findByIdAndDelete(Product_id);
    //check if the Product exists
    if (!deletedProduct) {
      return {
        status: 404,
        message: "Product not found",
      };
    }
    // remove the Product from the seller's sProducts array
    await Seller.updateOne(
      { _id: deletedProduct.seller },
      { $pull: { sellerProducts: deletedProduct._id } }
    );
    // delete all reviews of the Product
    return {
      status: 200,
      data: deletedProduct,
      message: "Seller Product deleted successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when deleting a seller Product - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not delete the seller Product",
    };
  }
};



export const updateSellerProduct= async (
  Product_id,
  user_id,
  ProductData
) => {
  try {
    // find Product by id
    const Product = await Product.findById(Product_id);
    //check if the Product exists
    if (!Product) {
      return {
        status: 404,
        message: "Product not found",
      };
    }
    //check if the user created the Product
    if (Product.user.toString() !== user_id) {
      return {
        status: 401,
        message: "User not authorized",
      };
    }
    //check if the seller exists
    const seller = await Seller.findById(Product.seller);
    if (!seller) {
      return {
        status: 404,
        message: "Seller not found",
      };
    }
    //check if the Product exists in the seller's sellerProducts array
    const existingProduct = seller.sellerProducts.find(
      (r) => r.toString() === Product_id
    );
    if (!existingProduct) {
      return {
        status: 404,
        message: "Product not found for this seller",
      };
    }
    //update the Product
    const updatedProduct = await Product.findByIdAndUpdate(
      Product_id,
      ProductData,
      { new: true }
    );
    return {
      status: 200,
      data: updatedProduct,
      message: "Seller Product updated successfully",
    };
  } catch (err) {
    console.error(
      `An error occurred when updating a seller Product - err: ${err.message}`
    );
    return {
      status: 500,
      message: "Could not update the seller Product",
    };
  }
};
