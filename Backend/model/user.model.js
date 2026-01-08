import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "teacher", "book_seller", "admin"],
        default: "student",
    },
    avatar: {
        type: String, // URL to profile picture
        default: "",
    },
    bio: {
        type: String,
        default: "",
    },
    paymentDetails: { // For Teachers/Sellers to receive payments
        accountName: String,
        accountNumber: String,
        bankName: String,
        ifscCode: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course", // Changed from Book to Course
        },
    ],
    purchasedBooks: [ // Track physical/digital book purchases
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
        }
    ],
});
const User = mongoose.model("User", userSchema);
export default User;