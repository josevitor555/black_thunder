import api from './api';

// Tipos TypeScript para clientes
export interface Client {
  _id: string;
  nome: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipos TypeScript para as tarefas/projetos
export interface Task {
  _id?: string;
  nome: string;
  clienteId: string | Client; // Pode ser string (ID) ou objeto Client populado
  categoria?: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled' | 'paused' | 'revisao';
  prioridade: 'baixa' | 'media' | 'alta';
  descricao: string;
  dataCriacao?: Date;
  dataEntrega?: Date;
  link?: string;
  notas?: string;
}

export interface CreateTaskData {
  nome: string;
  clienteId: string;
  categoria?: string;
  status: Task['status'];
  prioridade: Task['prioridade'];
  descricao: string;
  dataEntrega?: Date;
  link?: string;
  notas?: string;
}

export interface UpdateTaskData {
  nome?: string;
  clienteId?: string;
  categoria?: string;
  status?: Task['status'];
  prioridade?: Task['prioridade'];
  descricao?: string;
  dataEntrega?: Date;
  link?: string;
  notas?: string;
}

// Serviço para gerenciar tarefas/projetos
export const taskService = {
  // Buscar todas as tarefas
  async getAllTasks(): Promise<Task[]> {
    try {
      const response = await api.get('/tasks/tasks');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      throw error;
    }
  },

  // Buscar tarefa por ID
  async getTaskById(id: string): Promise<Task> {
    try {
      const response = await api.get(`/tasks/tasks/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      throw error;
    }
  },

  // Criar nova tarefa
  async createTask(taskData: CreateTaskData): Promise<Task> {
    try {
      const response = await api.post('/tasks/create-task', taskData);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  },

  // Atualizar tarefa existente
  async updateTask(id: string, taskData: UpdateTaskData): Promise<Task> {
    try {
      const response = await api.put(`/tasks/update-task/${id}`, taskData);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  },

  // Deletar tarefa
  async deleteTask(id: string): Promise<void> {
    try {
      await api.delete(`/tasks/delete-task/${id}`);
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  }
};
