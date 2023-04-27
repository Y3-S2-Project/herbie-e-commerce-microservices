import express from "express";

import reviewRouter from "./review.routes";
const router = express.Router();

//root route for review
router.use("/reviews", reviewRouter);


export default router;
