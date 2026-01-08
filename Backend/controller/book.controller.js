import Book from "../model/book.model.js";

export const getBook = async(req, res) => {
    try {
        const { search, category, minPrice, maxPrice, rating } = req.query;
        let query = {};

        // Search (Name, Title, Author)
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } }
            ];
        }

        // Category
        if (category && category !== "All") {
            query.category = category;
        }

        // Price Range
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Rating
        if (rating) {
            query.rating = { $gte: Number(rating) };
        }

        const books = await Book.find(query);
        res.status(200).json(books);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const addBook = async(req, res) => {
    try {
        const { name, price, category, image, title, description, author, stock, format, pdfUrl, isbn } = req.body;
        
        const book = new Book({ 
            name: name || title, 
            title: title || name,
            price, 
            category, 
            image, 
            description, 
            author, 
            stock, 
            format, 
            pdfUrl, 
            isbn,
            seller: req.user._id 
        });
        
        await book.save();
        res.status(201).json({ message: "Book listed successfully", book });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Error adding book", error: error.message });
    }
};

export const updateBook = async(req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        if (book.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Not authorized to update this book" });
        }

        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
};

export const deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        if (book.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
             return res.status(403).json({ message: "Not authorized to delete this book" });
        }

        await Book.findByIdAndDelete(id);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
};