import { Router } from "express";
import {
  getCommission,
  addCommission,
  updateCommission,
} from "../controllers/commission.controller";
const router = Router();
//get all commission route
router.get("/", getCommission);
//create commission route
router.post("/", addCommission);
//update commission route
router.patch("/:_id", updateCommission);

export default router;
