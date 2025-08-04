// Estrutura de dados mock para projetos de clientes
export type Projeto = {
  notas: string;
  id: string;
  nome: string;
  cliente: string;
  avatarUrl?: string;
  categoria: string;
  status: 'backlog' | 'todo' | 'in_progress' | 'done' | 'canceled' | 'paused' | 'revisao';
  prioridade: 'alta' | 'media' | 'baixa';
  dataCriacao: string;
  dataEntrega?: string;
  descricao: string;
  link?: string;
};

export const projetosMock: Projeto[] = [
  {
    id: 'TASK-8782',
    nome: 'Compressão SSD Open Source',
    cliente: 'Carlos Silva',
    avatarUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
    categoria: 'Sistemas Internos',
    status: 'in_progress',
    prioridade: 'media',
    dataCriacao: '2024-05-01',
    dataEntrega: '2024-06-01',
    descricao: 'Você não pode comprimir o programa sem quantificar o SSD open-source.',
    link: '',
    notas: ""
  },
  {
    id: 'TASK-7878',
    nome: 'Cálculo EXE Feed',
    cliente: 'Ana Souza',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    categoria: 'Landing Page',
    status: 'backlog',
    prioridade: 'baixa',
    dataCriacao: '2024-04-15',
    descricao: 'Tente calcular o feed EXE, talvez ele indexe o pixel multi-byte!',
    link: '',
    notas: ""
  },
  {
    id: 'TASK-7839',
    nome: 'Bypass Neural TCP',
    cliente: 'Bruna Lima',
    avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
    categoria: 'Dashboard',
    status: 'todo',
    prioridade: 'alta',
    dataCriacao: '2024-05-10',
    descricao: 'Precisamos contornar o cartão neural TCP!',
    link: '',
    notas: ""
  },
  {
    id: 'TASK-5562',
    nome: 'SAS Interface Recovery',
    cliente: 'Eduardo Tavares',
    avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
    categoria: 'Sistemas Internos',
    status: 'backlog',
    prioridade: 'media',
    dataCriacao: '2024-05-12',
    descricao: 'A interface SAS está fora, precisamos contornar o pixel open-source.',
    link: '',
    notas: ""
  },
  {
    id: 'TASK-1280',
    nome: 'Digital TLS Panel',
    cliente: 'Gabriel Martins',
    avatarUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    categoria: 'E-commerce',
    status: 'done',
    prioridade: 'alta',
    dataCriacao: '2024-05-18',
    descricao: 'Use o painel TLS digital para transmitir o sistema háptico!',
    link: '',
    notas: ""
  },
  {
    id: 'TASK-7262',
    nome: 'UTF8 Application',
    cliente: 'Helena Dias',
    avatarUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
    categoria: 'Blog',
    status: 'done',
    prioridade: 'media',
    dataCriacao: '2024-05-20',
    descricao: 'A aplicação UTF8 está fora, analisar a largura de banda neural.',
    link: '',
    notas: ""
  },
  {
    id: 'TASK-1138',
    nome: 'Driver Quantification',
    cliente: 'Igor Pires',
    avatarUrl: 'https://randomuser.me/api/portraits/men/37.jpg',
    categoria: 'Portfólio',
    status: 'in_progress',
    prioridade: 'alta',
    dataCriacao: '2024-05-22',
    descricao: 'Gerar o driver não faz nada, precisamos quantificar o SM 1080p.',
    link: '',
    notas: ""
  },
  {
    id: 'TASK-7184',
    nome: 'Back-end THX',
    cliente: 'Juliana Castro',
    avatarUrl: 'https://randomuser.me/api/portraits/women/48.jpg',
    categoria: 'Site institucional',
    status: 'todo',
    prioridade: 'baixa',
    dataCriacao: '2024-05-25',
    descricao: 'Precisamos programar o pixel THX do back-end!',
    link: '',
    notas: ""
  },
  {
    id: 'TASK-5160',
    nome: 'Bus Calculation',
    cliente: 'Lucas Rocha',
    avatarUrl: 'https://randomuser.me/api/portraits/men/53.jpg',
    categoria: 'E-commerce',
    status: 'in_progress',
    prioridade: 'media',
    dataCriacao: '2024-05-28',
    descricao: 'Calcular o bus não faz nada, precisamos navegar o back-end JSON!',
    link: '',
    notas: ""
  },
  {
    id: 'TASK-9001',
    nome: 'Integração API Financeira',
    cliente: 'Patrícia Almeida',
    avatarUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    categoria: 'Sistemas Internos',
    status: 'revisao',
    prioridade: 'alta',
    dataCriacao: '2024-06-01',
    descricao: 'Integrar a API financeira ao dashboard principal e validar respostas.',
    link: '',
    notas: ""
  }
]; 