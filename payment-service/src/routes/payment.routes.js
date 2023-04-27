import { Router } from "express";
import { makePayment, updatePayment } from "../controllers/payment.controller";
const router = Router();
// make payment route
router.post("/", makePayment);
// update payment route
router.patch("/:_id", updatePayment);

export default router;
