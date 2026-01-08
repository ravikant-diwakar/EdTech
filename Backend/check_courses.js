import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./model/course.model.js";

dotenv.config();

const URI = process.env.MongoDBURI;

const checkCourses = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to MongoDB for checking...");

        const courses = await Course.find({});
        console.log(`Total Courses Found: ${courses.length}`);
        
        courses.forEach(c => {
            console.log(`Course: ${c.title} | ID: ${c._id} | Instructor: ${c.instructor}`);
        });

        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkCourses();
