
// import dotenv
import dotenv from "dotenv";
dotenv.config();

// Import mongoose ORM
import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectMongo;
