
// Import dotenv
import dotenv from "dotenv";
dotenv.config();

// Import express
import express from "express";

// Import cors
import cors from "cors";

// Import routs
import authRoutes from "./routes/routes.js";

// Import db
import { db } from "./database/db.js";

// Import mongodb connection function
import connectMongo from "./connectMongo/Mongo_connection.js";

// Create express app
const app = express();

// CORS Origin
app.use(cors({
    origin: ['http://localhost:5173'],
}));

// Express json format
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Define main endpoint for the others endpoints
app.use("/api", authRoutes); // http://localhost:3000/api/login (e.g)

// Route Text for Connect to MySql
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

// Connect to MongoDB
await connectMongo();

// Define port
const port = process.env.PORT || 3000;

// start server
app.listen(port, () => console.log(`Server is running on ${port} port!`));
