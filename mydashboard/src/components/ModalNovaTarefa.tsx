import * as React from 'react';
import type { Projeto } from '../lib/projects-mock';
import Updronw from './Updronw';

import { X } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const categorias = [
  'Blog', 'E-commerce', 'Portfólio', 'Site institucional', 'Landing Page', 'Dashboard administrativo', 'Outros'
];

const statusDropdown = [
  { value: 'planejamento', label: 'Planejamento' },
  { value: 'iniciado', label: 'Iniciado' },
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
  onAdd: (novoProjeto: Projeto) => void;
  editingTask?: Projeto | null;
}

const modalVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.18,
      ease: [0.42, 0, 0.58, 1]
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.18,
      ease: [0.42, 0, 1, 1],
    },
  },
};

const ModalNovaTarefa: React.FC<ModalNovaTarefaProps> = ({ open, onClose, onAdd, editingTask }) => {
  const [form, setForm] = React.useState({
    nome: '',
    cliente: '',
    descricao: '',
    categoria: categorias[0],
    prioridade: 'media',
    status: 'planejamento',
    dataCriacao: getToday(),
    dataEntrega: '',
    link: '',
    notas: '',
  });

  React.useEffect(() => {
    if (editingTask) {
      setForm({
        nome: editingTask.nome || '',
        cliente: editingTask.cliente || '',
        descricao: editingTask.descricao || '',
        categoria: editingTask.categoria || categorias[0],
        prioridade: editingTask.prioridade || 'media',
        status: editingTask.status || 'planejamento',
        dataCriacao: editingTask.dataCriacao || getToday(),
        dataEntrega: editingTask.dataEntrega || '',
        link: editingTask.link || '',
        notas: editingTask.notas || '',
      });
    } else {
      setForm({
        nome: '',
        cliente: '',
        descricao: '',
        categoria: categorias[0],
        prioridade: 'media',
        status: 'planejamento',
        dataCriacao: getToday(),
        dataEntrega: '',
        link: '',
        notas: '',
      });
    }
  }, [editingTask, open]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clienteValue = editingTask ? form.cliente.replace(/^@+/, '') : form.cliente;

    const novoProjeto: Projeto = {
      id: editingTask?.id || `TASK-${Math.floor(Math.random() * 9000 + 1000)}`,
      nome: form.nome,
      cliente: clienteValue,
      avatarUrl: editingTask?.avatarUrl,
      categoria: form.categoria,
      status: form.status as Projeto['status'],
      prioridade: form.prioridade as Projeto['prioridade'],
      dataCriacao: form.dataCriacao,
      dataEntrega: form.dataEntrega,
      descricao: form.descricao,
      link: form.link,
      notas: form.notas,
    };

    onAdd(novoProjeto);
    onClose();
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
              <button type="submit" className="btn-primary cursor-pointer">{editingTask ? 'Salvar alterações' : 'Salvar'}</button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalNovaTarefa;
