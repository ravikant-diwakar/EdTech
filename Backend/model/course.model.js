import mongoose from "mongoose";

const sectionSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    videoUrl: { type: String, required: true }, // URL to video (S3/Cloudinary/Local)
    duration: String, // e.g., "10:30"
    isFree: { type: Boolean, default: false }, // For preview
});

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    name: String, 
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    thumbnail: {
        type: String, // URL
    },
    videoUrl: String,
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
        default: 'All Levels'
    },
    curriculum: [sectionSchema], // Structured content
    status: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft',
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    enrolledStudents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
