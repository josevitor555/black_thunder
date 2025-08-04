// Import dotenv
import dotenv from "dotenv";
dotenv.config();

// Import bcrypt
import bcrypt from "bcryptjs";

// Import jwt
import jwt from "jsonwebtoken";

// Import db
import { db } from "../database/db.js";

// Register a new User
export const register = async (req, res) => {

    // Log the body
    console.log("BODY:", req.body);

    // Destructure the request body to get username, email, and password
    const { username, email, password } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows.length > 0) {
            return res.status(409).json({
                message: "User already existed."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const [result] = await db.query(
            "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)",
            [username, email, hashedPassword]
        );

        // Log the result
        console.log("INSERT result:", result);

        // Generate token
        const token = jwt.sign({ id: result.insertId }, process.env.JWT_KEY, { expiresIn: '3h' });

        // Get the created user data
        const [userRows] = await db.query("SELECT id, username, email, created_at FROM usuarios WHERE id = ?", [result.insertId]);
        
        // Send response with user data
        res.status(201).json({
            message: "User successfully registered",
            token,
            user: userRows[0]
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message
        });
    }
};

// Login a user
export const login = async (req, res) => {

    // Log the request
    const { email, username } = req.body;

    try {

        // Check if user exists
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ? AND username = ?', [email, username]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate token
        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, { expiresIn: '3h' });
        console.log("Generated token: ", token);

        // Send response with user data
        res.status(200).json({ 
            token,
            user: {
                id: rows[0].id,
                username: rows[0].username,
                email: rows[0].email,
                created_at: rows[0].created_at
            }
        });

    } catch (error) {

        // Log the error
        res.status(500).json({
            error: error.message
        });
    }
};

// Logout a user
export const logoutAccount = async (req, res) => {
    try {

        // Log the request
        const userId = req.userId;

        // Delete user from database
        const [result] = await db.query("DELETE FROM usuarios WHERE id = ?", [userId]);

        // Log the result
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        // Send response
        res.status(200).json({
            message: "Account deleted successfully."
        });

    } catch (error) {
        // Log the error
        console.error(error);

        // Send response
        res.status(500).json({
            message: "Error deleting account."
        });
    }
}

// Protected route controller
export const home = async (req, res) => {

    try {
        const [rows] = await db.query('SELECT id, username, email, created_at FROM usuarios WHERE id = ?', [req.userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        };

        res.status(200).json({
            user: rows[0]
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
