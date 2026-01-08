import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../utils/email.service.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, role, paymentDetails } = req.body;
    console.log("Signup Request:", { fullname, email, role });

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    
    // Created user is auto-verified since verification is disabled
    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
      role: role || "student",
      paymentDetails: paymentDetails || {},
      isVerified: true 
    });
    
    await createdUser.save();

    const token = generateToken(createdUser._id);

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
        role: createdUser.role,
        paymentDetails: createdUser.paymentDetails,
        token: token,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user?.password || "");

    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    } else {
      const token = generateToken(user._id);
      
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          bio: user.bio,
          paymentDetails: user.paymentDetails,
          isVerified: user.isVerified,
          enrolledCourses: user.enrolledCourses,
          purchasedBooks: user.purchasedBooks,
          token: token,
        },
      });
    }
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = Math.random().toString(36).substring(2, 15);
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({ 
            resetPasswordToken: token, 
            resetPasswordExpires: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" });
        }

        const hashPassword = await bcryptjs.hash(newPassword, 10);
        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to reset password" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password").populate('enrolledCourses').populate('purchasedBooks');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};