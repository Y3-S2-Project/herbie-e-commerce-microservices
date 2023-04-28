import {
  getAllProductOnSaleRepository,
  createProductRepository,
  getDeleteProductRepository,
  getAllProductsRepository,
  updateVisibleStatusRepository,
  getSingleProductRepository,
  editProductRepository,
} from "../repository/product.repository";

//  get all Products from the database
export const getAllProductsService = async (userId) => {
  return await getAllProductsRepository(userId);
};

// get a Product by id from the database
export const getProductByIdService = async (Product_id) => {
  return await getSingleProductRepository(Product_id);
};
// create a product in the database
export const createSellerProductService = async (Product, sellerId) => {
  return await createProductRepository(Product, sellerId);
};

// delete a  Product from the database
export const deleteProductService = async (sellerId, Product_id) => {
  return await getDeleteProductRepository(sellerId, Product_id);
};
// get all Products on sale from the database
export const getAllProductOnSaleService = async () => {
  return await getAllProductOnSaleRepository();
};
// update a Product in the database
export const updateProductService = async (pPid, productData) => {
  return await editProductRepository(pPid, productData);
};

export const updateVisibleStatusService = async (pPid) => {
  return await updateVisibleStatusRepository(pPid);
};

export const getSingleProductService = async (pPid) => {
  return await getSingleProductRepository(pPid);
};
