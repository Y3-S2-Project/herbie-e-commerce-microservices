import {
  getAllDeliveryRepository,
  createDeliveryRepository,
  getDeliveryByDeliveryIdRepository,
  updateDeliveryRepository,
  getDeliveryByIdRepository,
} from "../repository/delivery.repository.js";
// get all delivery service
export const getAllDeliveryService = async () => {
  return await getAllDeliveryRepository();
};
// create delivery service
export const createDeliveryService = async (delivery) => {
  return await createDeliveryRepository(delivery);
};
// get delivery by delivery id service
export const getDeliveryByDeliveryIdService = async (delivery_id) => {
  return await getDeliveryByDeliveryIdRepository(delivery_id);
};


// update delivery service
export const updateDeliveryService = async (delivery) => {
  return await updateDeliveryRepository(delivery);
};
// get delivery by id service
export const getDeliveryByIdService = async (deliveryData) => {
  return await getDeliveryByIdRepository(deliveryData);
};
