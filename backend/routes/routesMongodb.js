
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

// Import routes to Client Management
import { 
    createOrFindClient, 
    getAllClients, 
    getClientById 
} from "../controllers/Controllers_MongoDb.js";

// Task Management (MongoDB)

// Create a new router
const routerMongoDb = express.Router();

// 1. Create a new task 
routerMongoDb.post("/create-task", createTask);

// 2. Update an existing task
routerMongoDb.put("/update-task/:id", updateTask);

// 3. Delete an existing task
routerMongoDb.delete("/delete-task/:id", deleteTask);

// 4. Get all tasks
routerMongoDb.get("/tasks", getAllTasks);

// 5. Get task by ID
routerMongoDb.get("/tasks/:id", getTaskById);

// Client Management (MongoDB)

// 6. Create or find client by name
routerMongoDb.post("/clients/create-or-find", createOrFindClient);

// 7. Get all clients
routerMongoDb.get("/clients", getAllClients);

// 8. Get client by ID
routerMongoDb.get("/clients/:id", getClientById);

export default routerMongoDb;
