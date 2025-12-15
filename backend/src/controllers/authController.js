const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { Op } = require("sequelize");
const { sendResetEmail, testEmailConfig } = require("../utils/email");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = signToken(user.id);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists and password is correct
    const user = await User.findOne({
      where: { email, isActive: true },
    });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user.id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    console.log("🔐 Forgot password request for:", email);

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ where: { email } });

    const successMessage =
      "Password reset instructions have been sent to your email.";

    if (!user) {
      console.log("📧 Email not found in database:", email);
      return res.json({
        message: successMessage,
      });
    }

    console.log("✅ User found:", user.email);

    const resetToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1h" }
    );

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    console.log("Reset token saved to database");

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("\n  Email not configured - running in development mode");
      const resetUrl = `${
        process.env.FRONTEND_URL || "http://localhost:3000"
      }/reset-password?token=${resetToken}`;

      console.log(" Reset URL (development):", resetUrl);

      return res.json({
        message: successMessage,
        development: true,
        resetUrl: resetUrl,
        note: "Email not configured. Use this reset URL.",
      });
    }

    console.log("Sending actual email...");
    const emailSent = await sendResetEmail(user.email, resetToken);

    if (emailSent) {
      console.log("Email sent successfully");
      return res.json({
        message: successMessage,
      });
    } else {
      console.log(" Failed to send email");
      return res.status(500).json({
        message: "Failed to send reset email. Please try again later.",
      });
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    );

    const user = await User.findOne({
      where: {
        id: decoded.id,
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Reset token has expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};
