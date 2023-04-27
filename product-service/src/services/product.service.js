import {
  getAllProducts,
  getProductById,
  getProducts,
  createProduct,

  deleteProduct,
  deleteSellerProduct,
  updateSellerProduct,


  
} from '../repository/product.repository.js'

export const getAllProductsService = async () => {
  const Products = await getAllProducts();
  return Products;
};

export const getProductsService = async (ProductData) => {
  return await getProducts(ProductData);
};

export const getProductByIdService = async (Product_id) => {
  const Product = await getProductById(Product_id);
  return Product;
};



export const createSellerProductService = async (Product) => {
  const { seller } = Product;
  return await createProduct(Product, seller._id);
};

export const deleteProduct= async (Product_id) => {
  return await deleteProduct(Product_id);
};



export const updateProductProductService = async (user_id, ProductData) => {
  const { _id } = ProductData;
  return await updateProductProductRepository(_id, user_id, ProductData);
};

export const updateSellerProductService = async (user_id, ProductData) => {
  const { _id } = ProductData;
  return await updateSellerProductRepository(_id, user_id, ProductData);
};
