// Import express
import express from "express";

// Import auth controller
import { register, login, logoutAccount, home } from "../controllers/authController.js";

// Import VerifyToken
import verifyToken from "../middlewares/authMiddleware.js";

// Create a new router
const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Logout user
router.delete("/logoutAccount", verifyToken, logoutAccount);

// Protected Route
router.get("/home", verifyToken, home);

export default router;