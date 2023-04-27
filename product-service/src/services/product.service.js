import {
  getAllProducts,
  getProductById,
  getProducts,
  createProduct,
  deleteProduct,
} from "../repository/product.repository.js";
//  get all Products from the database
export const getAllProductsService = async () => {
  const Products = await getAllProducts();
  return Products;
};
// get Products from the database
export const getProductsService = async (ProductData) => {
  return await getProducts(ProductData);
};
// get a Product by id from the database
export const getProductByIdService = async (Product_id) => {
  const Product = await getProductById(Product_id);
  return Product;
};
// create a product in the database
export const createSellerProductService = async (Product) => {
  const { seller } = Product;
  return await createProduct(Product, seller._id);
};
// delete a  Product from the database
export const deleteProduct = async (Product_id) => {
  return await deleteProduct(Product_id);
};
