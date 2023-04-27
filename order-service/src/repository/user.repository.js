import User from "../models/user.model";

export const getOneUser = async (filters, returnPassword = false) => {
  const user = await User.findOne(filters)
  if (!user) return null;

  if (!returnPassword) delete user.password;
  return user;
};
