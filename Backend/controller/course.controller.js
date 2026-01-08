import Course from "../model/course.model.js";
import Book from "../model/book.model.js";

// Get all courses (public)
export const getCourses = async (req, res) => {
    try {
        const { search, category, level, minPrice, maxPrice, rating } = req.query;
        let query = { status: 'Published' };

        // Search (Title, Description)
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        // Category
        if (category && category !== "All") {
            query.category = category;
        }

        // Level
        if (level && level !== "All") {
            query.level = level;
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

        const courses = await Course.find(query).populate("instructor", "fullname avatar bio");
        res.status(200).json(courses);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

// Get single course
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("instructor", "fullname avatar bio")
            .populate("reviews");
        res.status(200).json(course);
    } catch (error) {
           res.status(500).json({ message: "Server Error" });
    }
};

// Create a new course (Teacher only)
export const createCourse = async (req, res) => {
    try {
        const { title, name, description, price, category, level, image, videoUrl } = req.body;
        
        // Basic validation
        if (!title && !name) return res.status(400).json({ message: "Title is required" });

        const course = new Course({
            title: title || name, 
            name: name || title,
            slug: (title || name).toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
            description: description || "No description provided",
            price: Number(price),
            category,
            level,
            image: image, 
            thumbnail: image, 
            videoUrl, 
            instructor: req.user._id,
            status: "Published", 
        });

        await course.save();
        console.log(`Course Created: ${course.title} (${course._id}) by Instructor: ${req.user._id}`);

        res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
        console.error("Create Course Error:", error);
        res.status(500).json({ message: "Failed to create course", error: error.message });
    }
};

// Get My Courses (Teacher)
export const getMyCourses = async (req, res) => {
    try {
        console.log(`Fetching courses for instructor: ${req.user._id}`);
        const courses = await Course.find({ instructor: req.user._id });
        
        // DEBUG: Force error to show user ID in frontend
        return res.status(400).json({ 
            message: `DEBUG: UserID=${req.user._id} | Found=${courses.length} courses` 
        });

        // res.status(200).json(courses);
    } catch (error) {
        console.error("Get Courses Error:", error);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};

// Delete Course
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Not authorized" });
        }

        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Course deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// Teacher Analytics
export const getTeacherAnalytics = async (req, res) => {
    try {
        const courses = await Course.find({ instructor: req.user._id });
        
        const totalCourses = courses.length;
        const totalStudents = courses.reduce((acc, course) => acc + (course.enrolledStudents ? course.enrolledStudents.length : 0), 0);
        const totalEarnings = courses.reduce((acc, course) => acc + (course.price * (course.enrolledStudents ? course.enrolledStudents.length : 0)), 0);

        res.status(200).json({
            totalCourses,
            totalStudents,
            totalEarnings
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch analytics" });
    }
};
