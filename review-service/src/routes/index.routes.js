import express from "express";

import reviewRouter from "./review.routes";
const router = express.Router();


router.use("/reviews", reviewRouter);


export default router;
