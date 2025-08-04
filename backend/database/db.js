// Immport mysql2
import mysql from "mysql2/promise"

// import dotenv
import dotenv from "dotenv";
dotenv.config();

// Create Pool connection (Recommended)
export const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
