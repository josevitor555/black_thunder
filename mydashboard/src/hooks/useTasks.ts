import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';
import type { Task, CreateTaskData, UpdateTaskData } from '../services/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar todas as tarefas
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getAllTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Erro ao buscar tarefas');
      console.error('Erro ao buscar tarefas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Criar nova tarefa
  const createTask = useCallback(async (taskData: CreateTaskData) => {
    try {
      setLoading(true);
      setError(null);
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError('Erro ao criar tarefa');
      console.error('Erro ao criar tarefa:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar tarefa
  const updateTask = useCallback(async (id: string, taskData: UpdateTaskData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task._id === id ? updatedTask : task
      ));
      return updatedTask;
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error('Erro ao atualizar tarefa:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Deletar tarefa
  const deleteTask = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await taskService.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      setError('Erro ao deletar tarefa');
      console.error('Erro ao deletar tarefa:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar tarefa por ID
  const getTaskById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const task = await taskService.getTaskById(id);
      return task;
    } catch (err) {
      setError('Erro ao buscar tarefa');
      console.error('Erro ao buscar tarefa:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Limpar erro
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    getTaskById,
    fetchTasks,
    clearError
  };
};
