import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const URI = process.env.MongoDBURI;

const seedData = [
  {
    name: "Full Stack Web Development",
    title: "Master the MERN Stack",
    price: 49.99,
    category: "Web Dev",
    image: "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg",
    description: "Learn MongoDB, Express, React, and Node.js from scratch. Build real-world applications.",
    type: "course",
    videoUrl: "https://www.youtube.com/embed/example1"
  },
  {
    name: "Advanced React Patterns",
    title: "Level up your React skills",
    price: 39.99,
    category: "Frontend",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*y6C4nSvy2Woe0m7bWEn4BA.png",
    description: "Deep dive into HOCs, Render Props, Hooks, and Context API.",
    type: "course",
    videoUrl: "https://www.youtube.com/embed/example2"
  },
  {
    name: "Node.js Microservices",
    title: "Scalable Backend Architecture",
    price: 59.99,
    category: "Backend",
    image: "https://media.licdn.com/dms/image/D4D12AQF2aa-X3p3xGQ/article-cover_image-shrink_720_1280/0/1695276646549?e=2147483647&v=beta&t=Ue4R-wQ04QzM-gqKyFqJqzJ9P1pC9sZ6c5Z6c5Z6c5",
    description: "Build robust microservices using Node.js, Docker, and Kubernetes.",
    type: "course",
    videoUrl: "https://www.youtube.com/embed/example3"
  },
   {
    name: "Python for Data Science",
    title: "Data Analysis & Visualization",
    price: 0,
    category: "Data Science",
    image: "https://imageio.forbes.com/specials-images/imageserve/5f9fa3f9273b063d89868726/0x0.jpg?format=jpg&width=1200",
    description: "Master Python libraries like Pandas, NumPy, and Matplotlib.",
    type: "course", // Free course
    videoUrl: "https://www.youtube.com/embed/example4"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB for seeding");

    // Optional: Clear existing courses? Maybe not to avoid deleting user data.
    // Let's just add if they don't exist or just add them. 
    // For safety, let's just add them.
    
    await Book.insertMany(seedData);
    console.log("Data Seeded Successfully");
    
    mongoose.connection.close();
  } catch (error) {
    console.log("Error seeding data:", error);
    process.exit(1);
  }
};

seedDB();
