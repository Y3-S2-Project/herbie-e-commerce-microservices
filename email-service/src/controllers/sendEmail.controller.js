import asyncHandler from "../middleware/async";
// import { getPickupRequests, createPickupRequest, updatePickupRequest, getPickupRequest, deletePickupRequest } from '../services/pickuprequest'
import { makeResponse } from "../utils/response";
import EmailSender from "../utils/sendEmail";

export const sendEmail = asyncHandler(async (req, res) => {
  
  try {
    const { fullName, email, message } = req.body; // req.body is the data that is sent with the request from the client 
    EmailSender({ fullName, email, message });
    return makeResponse({
      res,
      status: 200,
      message: "Your message sent successfully",
    });
  } catch (error) {
    return makeResponse({
      res,
      status: 404,
      message: "Error ❌" + error.message, // error.message
    });
  }
});
