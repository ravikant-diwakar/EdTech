import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./model/user.model.js";

dotenv.config();

const URI = process.env.MongoDBURI;

const checkUser = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB...");

        // Find user by name Monu Kumar (from screenshot)
        // Using regex for case insensitivity
        const user = await User.findOne({ fullname: { $regex: /Monu Kumar/i } });
        
        if (user) {
            console.log(`User Found: ${user.fullname}`);
            console.log(`ID: ${user._id}`);
            console.log(`Email: ${user.email}`);
            console.log(`Role: ${user.role}`);
        } else {
            console.log("User 'Monu Kumar' not found.");
            // List all users to see who is there
            const allUsers = await User.find({}, 'fullname email _id');
            console.log("All Users:", allUsers);
        }

        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkUser();
