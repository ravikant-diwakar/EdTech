import express from "express";
import { getCourses, getCourseById, createCourse, getMyCourses, deleteCourse, getTeacherAnalytics } from "../controller/course.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/my-courses", protect, authorize("teacher", "admin"), getMyCourses);
router.get("/:id", getCourseById);
router.post("/add", protect, authorize("teacher", "admin"), createCourse);
router.delete("/delete/:id", protect, authorize("teacher", "admin"), deleteCourse);

router.get("/analytics", protect, authorize("teacher", "admin"), getTeacherAnalytics);

export default router;
