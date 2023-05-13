const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
import {
  createPaymentRepository,
  updatePaymentRepository,
} from "../repository/payment.repository";
// create payment service
export const createPaymentService = async (payment) => {
  
  return await createPaymentRepository(payment);
};
// update payment service
export const updatePaymentService = async (id, payment) => {
  return await updatePaymentRepository(id, payment);
};
