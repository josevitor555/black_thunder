
// Import express
import express from "express";

// Import routes to Task Management
import { 
    createTask, 
    updateTask, 
    deleteTask, 
    getAllTasks, 
    getTaskById 
} from "../controllers/Controllers_MongoDb.js";

// Task Management (MongoDB)

// Create a new router
const routerMongoDb = express.Router();

// 1. Create a new task 
routerMongoDb.post("/create-task", createTask);

// 2. Update an existing task (usando ID como parâmetro)
routerMongoDb.put("/update-task/:id", updateTask);

// 3. Delete task by ID
routerMongoDb.delete("/delete-task/:id", deleteTask);

// 4. Get all tasks (para facilitar testes)
routerMongoDb.get("/tasks", getAllTasks);

// 5. Get task by ID (para facilitar testes)
routerMongoDb.get("/tasks/:id", getTaskById);

export default routerMongoDb;
