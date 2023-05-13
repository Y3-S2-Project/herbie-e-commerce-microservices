import Delivery from "../models/delivery.model";
import logger from "../utils/logger";

// get all deliveries repository
export const getAllDeliveryRepository = async () => {
  try {
    //get all deliveries
    const allDeliveries = await Delivery.find({});
    return allDeliveries;
  } catch (err) {
    console.error(
      `An error occurred when retrieving all deliveries - err: ${err.message}`
    );
    return null;
  }
};
// create delivery repository
export const createDeliveryRepository = async (delivery) => {
  // create a new delivery
  const newDelivery = new Delivery(delivery);
  //get delivery count
  const deliveryCount = await Delivery.count();
  newDelivery.deliveryId = `DEL${deliveryCount + 1}`;
  if (!newDelivery) return null;

  try {
    // save the delivery
    const savedDelivery = await newDelivery.save();
    return savedDelivery;
  } catch (err) {
    console.error(
      `An error occurred when creating a delivery - err: ${err.message}`
    );
    return null;
  }
};
// get delivery by delivery id repository
export const getDeliveryByDeliveryIdRepository = async (delivery_id) => {
  try {
    // get delivery by delivery id
    const delivery = await Delivery.findById(delivery_id);
    // if delivery not found
    if (!delivery) {
      return null;
    }
    // return delivery
    return delivery;
  } catch (err) {
    console.error(
      `An error occurred when retrieving a delivery by id - err: ${err.message}`
    );
    return null;
  }
};
// update delivery repository
export const updateDeliveryRepository = async (delivery) => {
  try {
    // update delivery
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      { _id: delivery._id },
      delivery,
      {
        new: true,
      }
    );
    return updatedDelivery;
  } catch (err) {
    console.error(
      `An error occurred when updating a delivery - err: ${err.message}`
    );
    return null;
  }
};
// get delivery by id repository
export const getDeliveryByIdRepository = async (deliveryData) => {
  try {
    // get delivery by id
    const delivery = await Delivery.find(deliveryData);
    // if delivery not found
    if (!delivery) {
      return null;
    }
    // return delivery
    return delivery;
  } catch (err) {
    console.error(
      `An error occurred when retrieving a delivery by id - err: ${err.message}`
    );
    return null;
  }
};
