import Payment from "../models/payment.model.js";
import Order from "../models/order.model.js";
// create payment repository
const getMessageFromStatusCode = (statusCode) => {
  switch (statusCode) {
    case 2:
      return "success";
    case 0:
      return "pending";
    case -1:
      return "canceled";
    case -2:
      return "failed";
    default:
      return "chargedback";
  }
};
// create payment repository
export const createPaymentRepository = async (payment) => {
  const newPayment = new Payment(payment);
   // update order payment status
  await newPayment.save();
  // update order payment status
  await Order.findByIdAndUpdate(
    { _id: payment.order_id },
    { paymentStatus: getMessageFromStatusCode(payment.status_code) }
  );
  // return new payment
  return newPayment;
};
// update payment repository
export const updatePaymentRepository = async (id, payment) => {
  // update payment
  const updatedPayment = await Payment.findByIdAndUpdate(id, payment, {
    new: true,
  });
  // update order payment status
  if (payment?.status_code)
  
    await Order.findByIdAndUpdate(
      { _id: updatedPayment.order_id },
      { paymentStatus: getMessageFromStatusCode(updatedPayment.status_code) }
    );
  return updatedPayment;
};
