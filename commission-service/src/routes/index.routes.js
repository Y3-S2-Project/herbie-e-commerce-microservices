import express from "express";

import commissionRouter from "./commission.routes";
const router = express.Router();


router.use("/commission", commissionRouter);

export default router;
