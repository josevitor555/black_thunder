import api from './api';
import type { Client } from './taskService';

// Tipos TypeScript para clientes
export interface CreateClientData {
  nome: string;
  email?: string;
}

// Serviço para gerenciar clientes
export const clientService = {
  // Criar ou encontrar cliente por nome
  async createOrFindClient(clientData: CreateClientData): Promise<Client> {
    try {
      const response = await api.post('/tasks/clients/create-or-find', clientData);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar/buscar cliente:', error);
      throw error;
    }
  },

  // Buscar todos os clientes
  async getAllClients(): Promise<Client[]> {
    try {
      const response = await api.get('/tasks/clients');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  },

  // Buscar cliente por ID
  async getClientById(id: string): Promise<Client> {
    try {
      const response = await api.get(`/tasks/clients/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      throw error;
    }
  }
};
