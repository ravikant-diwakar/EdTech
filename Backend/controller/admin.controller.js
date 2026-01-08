import User from "../model/user.model.js";
import Order from "../model/order.model.js"; // Assuming order model exists
import Book from "../model/book.model.js";
import Course from "../model/course.model.js";

export const getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBooks = await Book.countDocuments();
        const totalCourses = await Course.countDocuments({ status: 'Published' });
        
        // Mock revenue calculation if order model isn't fully populated with amounts
        const totalOrders = await Order.countDocuments(); 
        const totalRevenue = totalOrders * 20; // Avg $20 per order placeholder

        res.status(200).json({
            users: totalUsers,
            books: totalBooks,
            courses: totalCourses,
            orders: totalOrders,
            revenue: totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isBlocked, role } = req.body;
        
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (isBlocked !== undefined) user.isBlocked = isBlocked; // Need to add isBlocked to schema if not present
        if (role) user.role = role;

        await user.save();
        res.status(200).json({ message: "User updated", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
