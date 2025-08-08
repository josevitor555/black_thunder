import { useState } from 'react';

import '../App.css';
import '../index.css';

import { projetosMock } from '../lib/projects-mock';
import { Edit, User, Trash2 } from 'lucide-react';

import { Badge } from '../lib/Badge';
import type { Projeto } from '../lib/projects-mock';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../components/Avatar';
import ModalNovaTarefa from '../components/ModalNovaTarefa';
import Updronw from '../components/Updronw';
import { ImageUploadModal } from '../components/ImageUserUpload';

function getStatusVariant(status: string) {
    switch (status) {
        case 'done':
            return 'success';
        case 'in_progress':
            return 'warning';
        case 'canceled':
            return 'danger';
        default:
            return 'default';
    }
}

const statusOptions = [
    { value: '', label: 'Todos' },
    { value: 'done', label: 'Concluído' },
    { value: 'in_progress', label: 'Em andamento' },
    { value: 'canceled', label: 'Cancelado' },
    { value: 'backlog', label: 'Backlog' },
    { value: 'todo', label: 'A Fazer' },
];

const prioridadeOptions = [
    { value: '', label: 'Todas' },
    { value: 'alta', label: 'Alta' },
    { value: 'media', label: 'Média' },
    { value: 'baixa', label: 'Baixa' },
];

function filterProjetos(projetos: Projeto[], search: string, status: string, prioridade: string) {
    return projetos.filter((p) => {
        const matchSearch =
            p.nome.toLowerCase().includes(search.toLowerCase()) ||
            p.cliente.toLowerCase().includes(search.toLowerCase());
        const matchStatus = status ? p.status === status : true;
        const matchPrioridade = prioridade ? p.prioridade === prioridade : true;
        return matchSearch && matchStatus && matchPrioridade;
    });
}

const MainApp = () => {

    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [projetos, setProjetos] = useState(projetosMock);
    const [editingTask, setEditingTask] = useState<Projeto | null>(null);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadTargetProjeto, setUploadTargetProjeto] = useState<Projeto | null>(null);

    const projetosFiltrados = filterProjetos(projetos, search, status, prioridade);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const totalRows = projetosFiltrados.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 0));
    };

    const handleDeleteProjeto = (id: string) => {
        setProjetos((prev) => prev.filter((proj) => proj.id !== id));
    };

    function openImageModal(proj: Projeto) {
        setUploadTargetProjeto(proj);
        setShowUploadModal(true);
    }

    function closeImageModal() {
        setUploadTargetProjeto(null);
        setShowUploadModal(false);
    }

    function handleFileUpload(url: string) {
        if (uploadTargetProjeto) {
            setProjetos((prev) =>
                prev.map((p) =>
                    p.id === uploadTargetProjeto.id
                        ? { ...p, avatarUrl: url }
                        : p
                )
            );
            closeImageModal();
        }
    }

    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentProjetos = projetosFiltrados.slice(startIndex, endIndex);

    const [modalOpen, setModalOpen] = useState(false);

    const openNewTaskModal = () => {
        setEditingTask(null);
        setModalOpen(true);
    };

    const openEditTaskModal = (projeto: Projeto) => {
        setEditingTask(projeto);
        setModalOpen(true);
    };

    const handleAddOrUpdateProjeto = (projeto: Projeto) => {
        if (editingTask) {
            setProjetos(prev => prev.map(p => p.id === projeto.id ? projeto : p));
        } else {
            setProjetos(prev => [projeto, ...prev]);
        }
    };

    return (
        <div className="app flex flex-col min-h-screen bg-background text-foreground p-8 dark">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div className='flex flex-col'>
                    <h1 className='text-3xl font-bold'>Bem vindo de volta!</h1>
                    <p className='text-lg font-semibol'>Crie e gerencie suas tarefas com TASK'S!</p>
                </div>
                <button className="btn-primary whitespace-nowrap cursor-pointer" onClick={openNewTaskModal}>Nova Tarefa</button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faSearch} className="text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar tarefa ou cliente..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="border border-border rounded-full px-3 py-2 bg-background text-foreground w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
                
                <div className="flex gap-2 items-center">
                    <Updronw value={status} options={statusOptions} onChange={setStatus} />
                    <Updronw value={prioridade} options={prioridadeOptions} onChange={setPrioridade} />
                    <div className="flex items-center gap-3 ml-4">
                        <label htmlFor="rowsPerPage" className="text-sm text-muted-foreground whitespace-nowrap">
                            Linhas por página
                        </label>
                        <Updronw
                            value={String(rowsPerPage)}
                            options={[5, 10, 25, 50].map(n => ({ value: String(n), label: String(n) }))}
                            onChange={v => {
                                const n = parseInt(v, 10);
                                setRowsPerPage(Number.isNaN(n) ? 10 : n);
                                setPage(0);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="bg-card rounded-lg shadow p-6 overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">Projetos dos Clientes</h2>
                <div className="overflow-x-auto">
                    <motion.table
                        className="min-w-full text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-4 py-2 text-left">Nome</th>
                                <th className="px-4 py-2 text-left">Cliente</th>
                                <th className="px-4 py-2 text-left">Categoria</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Prioridade</th>
                                <th className="px-4 py-2 text-left">Data Criação</th>
                                <th className="px-4 py-2 text-left">Ações</th>
                            </tr>
                        </thead>
                        <AnimatePresence initial={false}>
                            <tbody>
                                {currentProjetos.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="text-center text-lg text-muted-foreground py-12">
                                            Nenhuma tarefa encontrada. Crie uma nova tarefa para começar.
                                        </td>
                                    </tr>
                                ) : (
                                    currentProjetos.map((projeto) => (
                                        <motion.tr
                                            key={projeto.id}
                                            className="border border-border hover:bg-muted"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3, ease: 'easeOut' }}
                                        >
                                            <td className="px-4 py-2">{projeto.id}</td>
                                            <td className="px-4 py-2">{projeto.nome}</td>
                                            <td className="px-4 py-2 flex items-center gap-2">
                                                <Avatar
                                                    alt={projeto.cliente ?? ''}
                                                    fallback={(projeto.cliente ?? '')
                                                        .split(' ')
                                                        .map((n: string) => n[0])
                                                        .join('')
                                                        .toUpperCase()}
                                                    src={projeto.avatarUrl}
                                                />

                                            </td>
                                            <td className="px-4 py-2">{projeto.categoria}</td>
                                            <td className="px-4 py-2 capitalize">
                                                <Badge variant={getStatusVariant(projeto.status)}>
                                                    {projeto.status.replace('_', ' ')}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-2 capitalize">{projeto.prioridade}</td>
                                            <td className="px-4 py-2">{projeto.dataCriacao}</td>
                                            <td className="px-4 py-2 flex gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="btn-primary flex items-center gap-1 cursor-pointer"
                                                    title="Editar"
                                                    onClick={() => openEditTaskModal(projeto)}
                                                >
                                                    <Edit size={16} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="btn-primary flex items-center gap-1 cursor-pointer"
                                                    title="Subir imagem do cliente"
                                                    onClick={() => openImageModal(projeto)}
                                                >
                                                    <User size={16} />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="btn-primary flex items-center gap-1 cursor-pointer"
                                                    title="Excluir"
                                                    onClick={() => handleDeleteProjeto(projeto.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </motion.button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </AnimatePresence>
                    </motion.table>
                </div>
            </div>
            <div className="flex items-center justify-between gap-8 mt-4">
                <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
                    <span className="text-foreground">
                        {page * rowsPerPage + 1} - {Math.min((page + 1) * rowsPerPage, totalRows)}
                    </span>
                    {" "} de {" "}
                    <span className="text-foreground">{totalRows}</span>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={() => setPage(0)}
                        disabled={page === 0}
                        className="btn-primary px-2 py-1 disabled:opacity-50"
                        aria-label="Primeira página"
                    >
                        <ChevronFirst size={16} />
                    </button>
                    <button
                        onClick={handlePrevPage}
                        disabled={page === 0}
                        className="btn-primary px-2 py-1 disabled:opacity-50"
                        aria-label="Página anterior"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={page >= totalPages - 1}
                        className="btn-primary px-2 py-1 disabled:opacity-50"
                        aria-label="Próxima página"
                    >
                        <ChevronRight size={16} />
                    </button>
                    <button
                        onClick={() => setPage(totalPages - 1)}
                        disabled={page >= totalPages - 1}
                        className="btn-primary px-2 py-1 disabled:opacity-50"
                        aria-label="Última página"
                    >
                        <ChevronLast size={16} />
                    </button>
                </div>
            </div>

            {modalOpen && (
                <ModalNovaTarefa
                    open={modalOpen}
                    onClose={() => { setModalOpen(false); setEditingTask(null); }}
                    onAdd={handleAddOrUpdateProjeto}
                    editingTask={editingTask}
                />
            )}

            {/* Sem animação */}
            {showUploadModal && (
                <ImageUploadModal
                    onClose={() => setShowUploadModal(false)}
                    onUpload={handleFileUpload}
                />
            )}
        </div>
    );
}

export default MainApp;
