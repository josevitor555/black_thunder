// Import express
import express from "express";

// Import routes to authenticate
import { register, login, logoutAccount, home } from "../controllers/Controllers_MySql.js";

// Import VerifyToken
import verifyToken from "../middlewares/Middleware.js";

// Create a new router
const routerMysql = express.Router();

// Authentication MySQL

// 1. Register a new user
routerMysql.post("/register", register);

// 2. Login user
routerMysql.post("/login", login);

// 3. Logout user
routerMysql.delete("/logoutAccount", verifyToken, logoutAccount);

// Protected Route
routerMysql.get("/home", verifyToken, home);

export default routerMysql;
