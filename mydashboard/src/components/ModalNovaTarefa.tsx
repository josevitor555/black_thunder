import * as React from 'react';
import type { Projeto } from '../lib/projects-mock';
import Updronw from './Updronw';
import { clientService } from '../services/clientService';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CreateTaskData, UpdateTaskData, Task } from '../services/taskService';

const categorias = [
  'Blog', 'E-commerce', 'Portfólio', 'Site institucional', 'Landing Page', 'Dashboard administrativo', 'Outros'
];

const statusDropdown = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'todo', label: 'A Fazer' },
  { value: 'in_progress', label: 'Em Progresso' },
  { value: 'done', label: 'Finalizado' },
  { value: 'paused', label: 'Pausado' },
  { value: 'canceled', label: 'Cancelado' },
  { value: 'revisao', label: 'Revisão' },
];

const prioridadesDropdown = [
  { value: 'alta', label: 'Alta' },
  { value: 'media', label: 'Média' },
  { value: 'baixa', label: 'Baixa' },
];

function getToday() {
  return new Date().toISOString().split('T')[0];
}

interface ModalNovaTarefaProps {
  open: boolean;
  onClose: () => void;
  editingTask?: Projeto | null;
  createTask: (taskData: CreateTaskData) => Promise<Task>;
  updateTask: (id: string, taskData: UpdateTaskData) => Promise<Task>;
}

const modalVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: "easeOut"
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.18,
      ease: "easeIn",
    },
  },
} as const;

const ModalNovaTarefa: React.FC<ModalNovaTarefaProps> = ({ open, onClose, editingTask, createTask, updateTask }) => {
  
  const [form, setForm] = React.useState({
    nome: '',
    cliente: '',
    descricao: '',
    categoria: categorias[0],
    prioridade: 'media',
    status: 'backlog',
    dataCriacao: getToday(),
    dataEntrega: '',
    link: '',
    notas: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  React.useEffect(() => {
    if (editingTask) {
      console.log('Modal recebeu editingTask:', editingTask);
      console.log('Cliente do editingTask:', editingTask.cliente);
      setForm({
        nome: editingTask.nome || '',
        cliente: editingTask.cliente || '',
        descricao: editingTask.descricao || '',
        categoria: editingTask.categoria || categorias[0],
        prioridade: editingTask.prioridade || 'media',
        status: editingTask.status || 'backlog',
        dataCriacao: editingTask.dataCriacao || getToday(),
        dataEntrega: editingTask.dataEntrega || '',
        link: editingTask.link || '',
        notas: editingTask.notas || '',
      });
    } else {
      console.log('Modal abrindo para nova tarefa');
      setForm({
        nome: '',
        cliente: '',
        descricao: '',
        categoria: categorias[0],
        prioridade: 'media',
        status: 'backlog',
        dataCriacao: getToday(),
        dataEntrega: '',
        link: '',
        notas: '',
      });
    }
  }, [editingTask]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setSuccessMessage('');
      
      console.log('Iniciando criação/busca do cliente:', form.cliente);
      
      // Primeiro, criar ou encontrar o cliente
      const cliente = await clientService.createOrFindClient({
        nome: form.cliente
      });
      
      console.log('Cliente encontrado/criado:', cliente);
      console.log('Cliente ID:', cliente._id);

      if (editingTask) {
        console.log('Atualizando tarefa existente:', editingTask.id);
        // Atualizar tarefa existente
        await updateTask(editingTask.id, {
          nome: form.nome,
          clienteId: cliente._id, // Usar o ID real do cliente
          categoria: form.categoria,
          status: form.status as 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled' | 'paused' | 'revisao',
          prioridade: form.prioridade as 'baixa' | 'media' | 'alta',
          descricao: form.descricao,
          dataEntrega: form.dataEntrega ? new Date(form.dataEntrega) : undefined,
          link: form.link,
          notas: form.notas,
        });
        setSuccessMessage('Tarefa atualizada com sucesso!');
      } else {
        console.log('Criando nova tarefa com clienteId:', cliente._id);
        // Criar nova tarefa
        await createTask({
          nome: form.nome,
          clienteId: cliente._id, // Usar o ID real do cliente
          categoria: form.categoria,
          status: form.status as 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled' | 'paused' | 'revisao',
          prioridade: form.prioridade as 'baixa' | 'media' | 'alta',
          descricao: form.descricao,
          dataEntrega: form.dataEntrega ? new Date(form.dataEntrega) : undefined,
          link: form.link,
          notas: form.notas,
        });
        setSuccessMessage('Tarefa criada com sucesso!');
      }

      console.log('Tarefa salva com sucesso!');
      
      // Aguardar um pouco para mostrar a mensagem de sucesso
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
      }, 1500);
      
    } catch (err) {
      console.error('Erro ao salvar tarefa:', err);
      setSuccessMessage('Erro ao salvar tarefa. Tente novamente.');
      // O erro já é tratado pelo hook
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="bg-card rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col gap-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >

            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold mb-2">{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
              <button
                onClick={onClose}
                className="relative p-4 rounded-full hover:bg-muted/30 transition cursor-pointer"
              >
                <X className="h-5 w-5 text-popover-foreground" />
              </button>
            </div>

            {/* Mensagem de sucesso ou erro */}
            {successMessage && (
              <div className={`p-3 rounded text-sm font-medium ${
                successMessage.includes('Erro') 
                  ? 'bg-red-100 text-red-700 border border-red-300' 
                  : 'bg-green-100 text-green-700 border border-green-300'
              }`}>
                {successMessage}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Nome do Projeto</label>
              <input name="nome" required value={form.nome} onChange={handleChange} className="border border-border rounded px-3 py-2 bg-background text-foreground" placeholder="Ex: Landing Page do Zé do Táxi" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Cliente</label>
              <input name="cliente" required value={form.cliente} onChange={handleChange} className="border border-border rounded px-3 py-2 bg-background text-foreground" placeholder="Pessoa ou empresa" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Descrição</label>
              <textarea name="descricao" required value={form.descricao} onChange={handleChange} className="border border-border rounded px-3 py-2 bg-background text-foreground" placeholder="Breve descrição do projeto" />
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium">Categoria</label>
                <Updronw value={form.categoria} options={categorias.map(c => ({ value: c, label: c }))} onChange={v => setForm(f => ({ ...f, categoria: v }))} />
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium">Prioridade</label>
                <Updronw value={form.prioridade} options={prioridadesDropdown} onChange={v => setForm(f => ({ ...f, prioridade: v }))} />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium">Status</label>
                <Updronw value={form.status} options={statusDropdown} onChange={v => setForm(f => ({ ...f, status: v }))} />
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <label className="text-sm font-medium">Previsão de Entrega</label>
                <input name="dataEntrega" type="date" value={form.dataEntrega} onChange={handleChange} className="border border-border rounded px-2 py-2 bg-background text-foreground" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Link do Projeto</label>
              <input name="link" type="url" value={form.link} onChange={handleChange} className="border border-border rounded px-3 py-2 bg-background text-foreground" placeholder="URL do Figma, deploy, repositório..." />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Observações/Notas</label>
              <textarea name="notas" value={form.notas} onChange={handleChange} className="border border-border rounded px-3 py-2 bg-background text-foreground" placeholder="Notas ou observações extras" />
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full py-4 px-4 rounded font-medium transition ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              >
                {isSubmitting ? 'Salvando...' : (editingTask ? 'Atualizar Tarefa' : 'Criar Tarefa')}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalNovaTarefa;
