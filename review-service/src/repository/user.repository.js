import User from "../models/user.model";
import logger from "../utils/logger";


export const getOneUser = async (filters, returnPassword = false) => {
  const user = await User.findOne(filters)
    .populate("buyer seller admin")
    .lean();
  if (!user) return null;

  if (!returnPassword) delete user.password;
  return user;
};

