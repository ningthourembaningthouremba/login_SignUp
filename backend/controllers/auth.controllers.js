import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {sendEmail} from "../utils/sendEmail.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // const exists = await UserModel.findOne({ email });
    // if (exists) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User already exists"
    //   });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // const user = await UserModel.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    //   otp,
    //   otpExpire: Date.now() + 10 * 60 * 1000
    // });

    // 🔥 TRY sending email, but DON'T crash
    try {
      await sendEmail(
  email,
  "Verify your account",
  `<h2>Your OTP is ${otp}</h2>`
);

    } catch (mailError) {
      console.error("EMAIL FAILED BUT USER CREATED:", mailError);
    }

    return res.status(201).json({
      success: true,
      message: "User registered. OTP generated.",
      otp, // ⚠️ DEV ONLY (remove later)
      // user: {
      //   id: user._id,
      //   email: user.email
      // }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


/* ================= LOGIN ================= */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `Reset Password Link:\n\n${resetUrl}\n\nValid for 10 minutes`;

    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message
    });

    res.json({ message: "Reset email sent" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req, res) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: "Token invalid or expired" });

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//verifyOtp controller
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account already verified"
      });
    }

    if (user.otp !== otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Account verified successfully"
    });

  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
