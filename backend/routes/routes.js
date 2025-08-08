// Import express
import express from "express";

// Import routes to authenticate and Import to Task Management
import { register, login, logoutAccount, home, createTask, updateTask, deleteTask } from "../controllers/Controllers.js";

// Import VerifyToken
import verifyToken from "../middlewares/Middleware.js";

// Create a new router
const router = express.Router();

// Authentication MySQL

// 1. Register a new user
router.post("/register", register);

// 2. Login user
router.post("/login", login);

// 3. Logout user
router.delete("/logoutAccount", verifyToken, logoutAccount);

// Task Management (MongoDB)

// 1. Create a new task 
router.post("/register-task", createTask);

// 2. Update an existing task
router.put("/update-task", updateTask);

// 3. Delete task by ID
router.delete("/delete-task/:id", deleteTask);

// Protected Route
router.get("/home", verifyToken, home);

export default router;
