import User from "../models/user.model";
import logger from "../utils/logger";
// get the current highest user ID from the database
export const getOneUser = async (filters, returnPassword = false) => {
  const user = await User.findOne(filters).populate("seller").lean();
  if (!user) return null;

  if (!returnPassword) delete user.password;
  return user;
};
