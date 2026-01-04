import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyOtp
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/verify-otp", verifyOtp);

export default router;