import express from "express";
import { signup, login, getProfile, forgotPassword, resetPassword } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, getProfile);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;