
// import dotenv
import dotenv from "dotenv";
dotenv.config();

// Import mongoose ORM
import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        // Especificar explicitamente o nome do banco de dados
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/dashboard_task";
        
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "dashboard_task"
        });
        
        console.log(`MongoDB connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectMongo;
