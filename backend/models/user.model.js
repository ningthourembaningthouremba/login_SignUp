import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    // 🔐 OTP fields
    otp: String,
    otpExpire: Date,
    isVerified: {
      type: Boolean,
      default: false
    },

    // 🔁 forgot password
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
