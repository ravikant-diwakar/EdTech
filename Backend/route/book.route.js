import express from "express";
import { getBook, addBook, updateBook, deleteBook } from "../controller/book.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getBook);
router.post("/add", protect, addBook);
router.put("/update/:id", protect, updateBook);
router.delete("/delete/:id", protect, deleteBook);

export default router;