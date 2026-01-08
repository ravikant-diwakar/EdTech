import express from "express";
import { createOrder, getMyOrders } from "../controller/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/my-orders", protect, getMyOrders);

export default router;
