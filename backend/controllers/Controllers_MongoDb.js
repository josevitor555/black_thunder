
// Models for mongodb
import projects from "../ModelSchemas/ProjectSchema.js";

// Import mongoose
import mongoose from "mongoose";

// Routes for task management (With MongoDB)

// 1. Create a new task 
export const createTask = async (req, res) => {
    try {
        const {
            nome,
            clienteId,
            categoria,
            status,
            prioridade,
            descricao,
            dataEntrega,
            link,
            notas
        } = req.body;

        // Validação dos campos obrigatórios
        if (!nome || !clienteId || !status || !prioridade || !descricao) {
            return res.status(400).json({
                success: false,
                message: "Campos obrigatórios: nome, clienteId, status, prioridade, descricao"
            });
        }

        // Validação dos enums
        const statusValidos = ['backlog', 'todo', 'in_progress', 'done', 'canceled', 'paused', 'revisao'];
        const prioridadesValidas = ['baixa', 'media', 'alta'];

        if (!statusValidos.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Status inválido. Valores permitidos: ${statusValidos.join(', ')}`
            });
        }

        if (!prioridadesValidas.includes(prioridade)) {
            return res.status(400).json({
                success: false,
                message: `Prioridade inválida. Valores permitidos: ${prioridadesValidas.join(', ')}`
            });
        }

        // Validação dos ObjectIds
        if (!mongoose.Types.ObjectId.isValid(clienteId)) {
            return res.status(400).json({
                success: false,
                message: "clienteId inválido"
            });
        }

        // Criação da nova tarefa
        const novaTarefa = new projects({
            nome,
            clienteId,
            categoria: categoria,
            status,
            prioridade,
            descricao,
            dataEntrega: dataEntrega ? new Date(dataEntrega) : undefined,
            link: link || "",
            notas: notas || ""
        });

        console.log("Modelo usado:", projects.modelName);
        console.log("Collection:", projects.collection.name);
        console.log("Dados da tarefa:", novaTarefa);

        const tarefaSalva = await novaTarefa.save();
        
        console.log("Tarefa salva com sucesso:", tarefaSalva);
        console.log("ID da tarefa salva:", tarefaSalva._id);

        res.status(201).json({
            success: true,
            message: "Tarefa criada com sucesso",
            data: tarefaSalva
        });

    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor ao criar tarefa",
            error: error.message
        });
    }
};

// 2. Update an existing task  
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validação do ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "ID da tarefa inválido"
            });
        }

        // Validação dos enums se fornecidos
        if (updateData.status) {
            const statusValidos = ['backlog', 'todo', 'in_progress', 'done', 'canceled', 'paused', 'revisao'];
            if (!statusValidos.includes(updateData.status)) {
                return res.status(400).json({
                    success: false,
                    message: `Status inválido. Valores permitidos: ${statusValidos.join(', ')}`
                });
            }
        }

        if (updateData.prioridade) {
            const prioridadesValidas = ['baixa', 'media', 'alta'];
            if (!prioridadesValidas.includes(updateData.prioridade)) {
                return res.status(400).json({
                    success: false,
                    message: `Prioridade inválida. Valores permitidos: ${prioridadesValidas.join(', ')}`
                });
            }
        }

        // Validação dos ObjectIds se fornecidos
        if (updateData.clienteId && !mongoose.Types.ObjectId.isValid(updateData.clienteId)) {
            return res.status(400).json({
                success: false,
                message: "clienteId inválido"
            });
        }

        if (updateData.projetoId && !mongoose.Types.ObjectId.isValid(updateData.projetoId)) {
            return res.status(400).json({
                success: false,
                message: "projetoId inválido"
            });
        }

        // Conversão da data de entrega se fornecida
        if (updateData.dataEntrega) {
            updateData.dataEntrega = new Date(updateData.dataEntrega);
        }

        // Busca e atualização da tarefa
        const tarefaAtualizada = await projects.findByIdAndUpdate(
            id,
            { ...updateData },
            { new: true, runValidators: true }
        );

        if (!tarefaAtualizada) {
            return res.status(404).json({
                success: false,
                message: "Tarefa não encontrada"
            });
        }

        res.json({
            success: true,
            message: "Tarefa atualizada com sucesso",
            data: tarefaAtualizada
        });

    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor ao atualizar tarefa",
            error: error.message
        });
    }
};

// 3. Delete task by ID
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Validação do ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "ID da tarefa inválido"
            });
        }

        // Busca e exclusão da tarefa
        const tarefaExcluida = await projects.findByIdAndDelete(id);

        if (!tarefaExcluida) {
            return res.status(404).json({
                success: false,
                message: "Tarefa não encontrada"
            });
        }

        res.json({
            success: true,
            message: "Tarefa excluída com sucesso",
            data: tarefaExcluida
        });

    } catch (error) {
        console.error("Erro ao excluir tarefa:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor ao excluir tarefa",
            error: error.message
        });
    }
};

// 4. Get all tasks (adicional para facilitar testes)
export const getAllTasks = async (req, res) => {
    try {
        const tarefas = await projects.find()
            .populate('clienteId', 'nome email');

        res.json({
            success: true,
            message: "Tarefas recuperadas com sucesso",
            count: tarefas.length,
            data: tarefas
        });

    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor ao buscar tarefas",
            error: error.message
        });
    }
};

// 5. Get task by ID (adicional para facilitar testes)
export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validação do ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "ID da tarefa inválido"
            });
        }

        const tarefa = await projects.findById(id)
            .populate('clienteId', 'nome email');

        if (!tarefa) {
            return res.status(404).json({
                success: false,
                message: "Tarefa não encontrada"
            });
        }

        res.json({
            success: true,
            message: "Tarefa encontrada com sucesso",
            data: tarefa
        });

    } catch (error) {
        console.error("Erro ao buscar tarefa:", error);
        res.status(500).json({
            success: false,
            message: "Erro interno do servidor ao buscar tarefa",
            error: error.message
        });
    }
};