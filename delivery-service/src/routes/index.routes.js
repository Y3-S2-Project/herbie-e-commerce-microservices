import express from "express";
import deliveryRouter from "./delivery.routes";

const router = express.Router();


router.use("/delivery", deliveryRouter);

export default router;
