import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: { type: String, required: true }, // Keeping 'name' for backward compatibility or refactor to title later
    price: { type: Number, required: true },
    category: String,
    image: String,
    title: String,
    description: String,
    author: String,
    
    // Seller Info
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    // Stock & Inventory
    stock: {
        type: Number,
        default: 0
    },
    
    // Format details
    format: {
        type: String,
        enum: ['Paperback', 'Hardcover', 'E-Book'],
        default: 'Paperback'
    },
    pdfUrl: String, // Only for E-Books
    isbn: String,

    // Ratings
    rating: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Book = mongoose.model("Book", bookSchema);

export default Book;