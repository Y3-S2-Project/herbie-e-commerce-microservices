import express from "express";
// import { protect, adminProtect } from '../middleware/auth.js'
import {
  getAllDeliveryController,
  getDeliveryByIdController,
  getDeliveryByDeliveryIdController,
  createDeliveryController,
  updateDeliveryController,
  // deleteDeliveryController,
} from "../controllers/delivery.controller";

const useRouter = express.Router();
//get all delivery route
useRouter.get("/", getAllDeliveryController);
//get delivery by id route
useRouter.get("/read-delivery", getDeliveryByIdController);
//get delivery by delivery id route
useRouter.get("/:delivery_id", getDeliveryByDeliveryIdController);
//create delivery route
useRouter.post("/create", createDeliveryController);
//update delivery route
useRouter.put("/update", updateDeliveryController);

export default useRouter;
