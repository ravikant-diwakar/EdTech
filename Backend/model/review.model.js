import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // ID of the Course or Book
    },
    targetType: {
        type: String,
        enum: ["Course", "Book"],
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
