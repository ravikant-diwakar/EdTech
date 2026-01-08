import User from "../model/user.model.js";

export const isAdmin = async (req, res, next) => {
  try {
    // req.user is set by the protect middleware
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
