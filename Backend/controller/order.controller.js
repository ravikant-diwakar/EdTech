import Order from "../model/order.model.js";
import User from "../model/user.model.js";
import Course from "../model/course.model.js";
import Book from "../model/book.model.js";

// Create Order (Simulated Payment)
export const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, paymentGateway } = req.body;
        // items: [{ product: ID, productType: 'Book'|'Course', price: Number }]

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in order" });
        }

        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            paymentGateway: paymentGateway || 'Stripe',
            paymentId: `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Simulated ID
            status: 'Completed' // Auto-complete for now
        });

        await order.save();

        // Grant access to courses / add books to purchased
        const user = await User.findById(req.user._id);
        
        for (const item of items) {
            if (item.productType === 'Course') {
                if (!user.enrolledCourses.includes(item.product)) {
                    user.enrolledCourses.push(item.product);
                    // Also add user to course enrolledStudents
                    await Course.findByIdAndUpdate(item.product, { $addToSet: { enrolledStudents: user._id } });
                }
            } else if (item.productType === 'Book') {
                 if (!user.purchasedBooks.includes(item.product)) {
                    user.purchasedBooks.push(item.product);
                    // Update stock
                    await Book.findByIdAndUpdate(item.product, { $inc: { stock: -1 } });
                 }
            }
        }
        await user.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error("Order Error:", error);
        res.status(500).json({ message: "Order failed", error: error.message });
    }
};

// Get My Orders
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};
