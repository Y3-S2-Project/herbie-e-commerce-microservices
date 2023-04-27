import {
  getAllProductsRepository,
  createProductProductRepository,
  deleteProductProductRepository,
  updateProductProductRepository,
  createSellerProductRepository,
  deleteSellerProductRepository,
  updateSellerProductRepository,
  getProductByIdRepository,
  getProductsRepository,
} from "../repository/Product.repository.js";

export const getAllProductsService = async () => {
  const Products = await getAllProductsRepository();
  return Products;
};

export const getProductsService = async (ProductData) => {
  return await getProductsRepository(ProductData);
};

export const getProductByIdService = async (Product_id) => {
  const Product = await getProductByIdRepository(Product_id);
  return Product;
};

export const createProductProductService = async (Product) => {
  const { product } = Product;
  return await createProductProductRepository(Product, product._id);
};

export const createSellerProductService = async (Product) => {
  const { seller } = Product;
  return await createSellerProductRepository(Product, seller._id);
};

export const deleteProductProductService = async (Product_id) => {
  return await deleteProductProductRepository(Product_id);
};

export const deleteSellerProductService = async (Product_id) => {
  return await deleteSellerProductRepository(Product_id);
};

export const updateProductProductService = async (user_id, ProductData) => {
  const { _id } = ProductData;
  return await updateProductProductRepository(_id, user_id, ProductData);
};

export const updateSellerProductService = async (user_id, ProductData) => {
  const { _id } = ProductData;
  return await updateSellerProductRepository(_id, user_id, ProductData);
};
