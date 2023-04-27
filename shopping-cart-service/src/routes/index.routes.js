import express from "express";
import cartRouter from "./cart.routes";

const router = express.Router();


router.use("/cart", cartRouter);

export default router;
