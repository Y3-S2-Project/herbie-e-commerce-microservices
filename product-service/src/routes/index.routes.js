import express from "express";

import productRouter from "./product.routes";

const router = express.Router();

//root route for product
router.use("/product", productRouter);


export default router;
