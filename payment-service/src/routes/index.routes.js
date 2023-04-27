import express from "express";

import paymentRouter from "./payment.routes";

const router = express.Router();

//root route for payment
router.use("/payment", paymentRouter);


export default router;
