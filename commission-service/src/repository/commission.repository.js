import Commission from "../models/commission.model";

// get commission repository
export const getCommissionRepository = async () => {
  return await Commission.findOne();
};
// add commission repository
export const addCommissionRepository = async (commission) => {
  const result = await Commission.findOne();
  if (result !== null) return result;
  return await await new Commission(commission).save();
};
 // update commission repository
export const updateCommissionRepository = async (id, commission) => {
  return await Commission.findByIdAndUpdate(id, commission, {
    new: true,
  });
};
