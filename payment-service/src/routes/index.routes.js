import express from "express";

import paymentRouter from "./payment.routes";

const router = express.Router();


router.use("/payment", paymentRouter);


export default router;
