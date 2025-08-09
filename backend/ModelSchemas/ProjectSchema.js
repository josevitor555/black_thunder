// models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O campo nome é obrigatório"]
    },
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: [true, "O campo clienteId é obrigatório"]
    },
    categoria: {
        type: String,
    },
    status: {
        type: String,
        required: [true, "O campo status é obrigatório"],
        enum: ['backlog', 'todo', 'in_progress', 'done', 'canceled', 'paused', 'revisao']
    },
    prioridade: {
        type: String,
        required: [true, "O campo prioridade é obrigatório"],
        enum: ["baixa", "media", "alta"]
    },
    descricao: String,
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    dataEntrega: Date,
    link: String,
    notas: String
});

export default mongoose.model("Project", taskSchema, "projects");
