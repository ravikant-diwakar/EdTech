import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import User from "./model/user.model.js";

dotenv.config();

const URI = process.env.MongoDBURI;

const seedAdmin = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB for seeding...");

    const adminEmail = "admin@edulearn.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      if (existingAdmin.role !== "admin") {
          existingAdmin.role = "admin";
          await existingAdmin.save();
          console.log("Updated existing user to Admin role.");
      }
    } else {
      const hashPassword = await bcryptjs.hash("admin123", 10);
      const newAdmin = new User({
        fullname: "Admin User",
        email: adminEmail,
        password: hashPassword,
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin user created successfully.");
    }

    console.log("-----------------------------------");
    console.log("Admin Credentials:");
    console.log("Email: admin@edulearn.com");
    console.log("Password: admin123");
    console.log("-----------------------------------");

    mongoose.disconnect();
  } catch (error) {
    console.log("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
