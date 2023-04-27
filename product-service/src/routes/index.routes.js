import express from "express";

import productRouter from "./product.routes";

const router = express.Router();


router.use("/product", productRouter);


export default router;