import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import purchaseRoute from "./route/purchase.route.js";
import courseRoute from "./route/course.route.js";
import orderRoute from "./route/order.route.js";
import paymentRoute from "./route/payment.route.js";
import adminRoute from "./route/admin.route.js";

const app = express();

app.use(cors());
app.use(express.json());

// LOGGING MIDDLEWARE
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log("Body:", req.body);
    next();
});

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/purchase", purchaseRoute);
app.use("/course", courseRoute);
app.use("/order", orderRoute);
app.use("/payment", paymentRoute);
app.use("/admin", adminRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log("Server Restarted at " + new Date().toISOString());
});