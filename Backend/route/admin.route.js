import express from "express";
import { getAnalytics, getUsers, updateUserStatus } from "../controller/admin.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

// protect + authorize admin
router.get("/analytics", protect, authorize("admin"), getAnalytics);
router.get("/users", protect, authorize("admin"), getUsers);
router.put("/users/:id", protect, authorize("admin"), updateUserStatus);

export default router;
