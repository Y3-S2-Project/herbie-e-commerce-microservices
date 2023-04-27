import { getOneUser } from "../repository/user.repository";
import { decodeJwtToken } from "../utils/jwt";
import { makeResponse } from "../utils/response";
import asyncHandler from "./async";

//To protect routes for only authenticated users
export const protect = asyncHandler(async (req, res, next) => {
  //Check if token is present in the request header
  const token = req.headers.authorization
    ? req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null
    : null;
  //If token is not present, return unauthorized
  if (!token)
    return makeResponse({ res, status: 403, message: "Unauthorized" });
  //Decode the token and get the user details
  const decodedUser = decodeJwtToken(token).data;
  //Get the user details from the database
  const user = decodedUser
    ? await getOneUser({ _id: decodedUser._id }, false)
    : null;
  //If user is not present, return unauthorized
  if (!user) return makeResponse({ res, status: 403, message: "Unauthorized" });
  //If user is present, set the user details in the request object
  req.user = user;
  //Call the next middleware
  next();
});

//To protect routes for only admins
export const adminProtect = asyncHandler(async (req, res, next) => {
  //If user is not admin, return unauthorized
  if (req.user.role !== "ADMIN")
    return makeResponse({ res, status: 403, message: "Unauthorized" });
    //Call the next middleware
  next();
});



//To protect routes for only buyers
export const buyerProtect = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "BUYER")
    return makeResponse({ res, status: 403, message: "Unauthorized" });
  next();
});

//To protect routes for only sellers
export const sellerProtect = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "SELLER")
    return makeResponse({ res, status: 403, message: "Unauthorized" });
  next();
});
