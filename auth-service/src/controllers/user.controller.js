import asyncHandler from "../middleware/async";
import { makeResponse } from "../utils/response";
import {
  addNewUser,
  getUsers,
  getUserByID,
  updateUserdetails,
} from "../services/user.services";
// create user
export const create = asyncHandler(async (req, res) => {
  const result = await addNewUser(req.body);
  if (!result)
    return makeResponse({ res, status: 500, message: "Failed to add user" });
  if (result.status) return makeResponse({ res, ...result });
  return makeResponse({
    res,
    status: 201,
    data: result,
    message: "User added successfully",
  });
});
// get all users
export const getAll = asyncHandler(async (req, res) => {
  const users = await getUsers(req.query);
  return makeResponse({
    res,
    status: 200,
    data: users,
    message: "Users retrieved succesfully",
  });
});
// get user by id
export const getById = asyncHandler(async (req, res) => {
  const ret = await getUserByID(req.params.id);
  if (ret.status) return makeResponse({ res, ...ret });
  return makeResponse({
    res,
    status: 200,
    data: ret,
    message: "User retrieved succesfully",
  });
});
// update user
export const update = asyncHandler(async (req, res) => {
  const result = await updateUserdetails(req.params.id, req.user, req.body);
  if (!result)
    return makeResponse({ res, status: 500, message: "Failed to update user" });
  if (result.status) return makeResponse({ res, ...result });
  return makeResponse({
    res,
    status: 200,
    data: result,
    message: "User updated successfully",
  });
});

// get my details
export const getMyDetails = asyncHandler(async (req, res) => {
  const user = await getUserByID(req.user._id);
  if (user.status) return makeResponse({ res, ...user });
  return makeResponse({
    res,
    status: 200,
    data: user,
    message: "User retrieved succesfully",
  });
});
