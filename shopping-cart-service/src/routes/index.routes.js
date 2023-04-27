import express from "express";
import cartRouter from "./cart.routes";

const router = express.Router();

//root route for cart
router.use("/cart", cartRouter);

export default router;
