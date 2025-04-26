import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Route to Register a new user
router.post("/register", registerUser);

// Route to Login
router.post("/login", loginUser);

export default router;
