import express from "express";
import { purchaseBook } from "../controller/purchase.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/buy", protect, purchaseBook);

export default router;
