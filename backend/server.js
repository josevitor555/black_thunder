
// Import dotenv
import dotenv from "dotenv";
dotenv.config();

// Import express
import express from "express";

// Import cors
import cors from "cors";

// Import routs
import authRoutes from "./routes/authRoutes.js";

// Import db
import { db } from "./database/db.js";

// Create express app
const app = express();

// CORS Origin
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));

// Express json format
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rout Text for Connect to MySql
app.get("/connect-mysql", async(req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM usuarios");

        if (rows.length === 0) {
            console.log("No users found.");
        } else {
            console.log("Users found: ");
            console.table(rows);
        }

        res.json(rows);
    } catch (error) {
        console.log("Error to connect with mysql.", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Test endpoint to check user data
app.get("/test-user/:email", async(req, res) => {
    try {
        const { email } = req.params;
        const [rows] = await db.query("SELECT id, username, email, password, created_at FROM usuarios WHERE email = ?", [email]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const user = rows[0];
        console.log("User data:", {
            id: user.id,
            username: user.username,
            email: user.email,
            passwordLength: user.password ? user.password.length : 0,
            passwordStartsWith: user.password ? user.password.substring(0, 10) + "..." : "null"
        });
        
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            passwordLength: user.password ? user.password.length : 0,
            passwordStartsWith: user.password ? user.password.substring(0, 10) + "..." : "null"
        });
    } catch (error) {
        console.log("Error testing user:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// app.get("/", async(req, res) => {
//     res.send("O que é a vida?")
// });

// Define main endpoint for the others endpoints
app.use("/api", authRoutes); // http://localhost:3000/api/login (e.g)

// Define port
const port = process.env.PORT || 3000;

// start server
app.listen(port, () => console.log(`Server is running on ${port} port!`));
