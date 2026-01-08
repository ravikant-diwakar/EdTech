import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                refPath: 'items.productType' 
            },
            productType: { 
                type: String, 
                enum: ['Book', 'Course'],
                required: true 
            },
            quantity: { type: Number, default: 1 }, // 1 for courses
            price: Number, // Snapshot of price at purchase
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
        default: 'Pending',
    },
    paymentId: {
        type: String, // Stripe/Razorpay Payment ID
    },
    paymentGateway: {
        type: String,
        enum: ['Stripe', 'Razorpay'],
    },
    shippingAddress: { // Optional, only for physical books
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
