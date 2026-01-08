import Course from "../model/course.model.js";
import User from "../model/user.model.js";
import Book from "../model/book.model.js";

export const purchaseBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({ message: "Missing userId or bookId" });
        }

        // 1. Try finding it as a course first
        let course = null;
        try {
            course = await Course.findById(bookId);
        } catch (err) { }

        if (course) {
            // Transactional-like update: Update User AND Course
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { enrolledCourses: bookId } },
                { new: true, runValidators: false }
            ).populate("enrolledCourses"); // Return populated to be professional

            if (!updatedUser) return res.status(404).json({ message: "User not found" });

            // Update Course student count/list (Background/Async is fine usually, but we'll await)
            await Course.findByIdAndUpdate(bookId, {
                $addToSet: { enrolledStudents: userId }
            });

            return res.status(200).json({
                message: "Course enrolled successfully",
                user: updatedUser
            });
        }

        // 2. Try finding it as a Book
        let book = null;
        try {
            book = await Book.findById(bookId);
        } catch (err) { }

        if (book) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { purchasedBooks: bookId } },
                { new: true, runValidators: false }
            ).populate("purchasedBooks");

            if (!updatedUser) return res.status(404).json({ message: "User not found" });
            
            // Optional: Decrement stock if tracking inventory
            // await Book.findByIdAndUpdate(bookId, { $inc: { stock: -1 } });

            return res.status(200).json({
                message: "Book purchased successfully",
                user: updatedUser
            });
        }

        return res.status(404).json({ message: "Item not found" });

    } catch (error) {
        console.error("Purchase Error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
