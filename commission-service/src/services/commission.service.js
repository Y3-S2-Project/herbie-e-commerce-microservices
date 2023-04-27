import {
  getCommissionRepository,
  addCommissionRepository,
  updateCommissionRepository,
} from "../repository/commission.repository.js";
// get commission service
export const getCommissionService = async () => {
  return await getCommissionRepository();
};
// add commission service
export const addCommissionService = async (data) => {
  return await addCommissionRepository(data);
};
// update commission service
export const updateCommissionService = async (id, data) => {
  return await updateCommissionRepository(id, data);
};
