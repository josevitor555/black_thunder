# Briefing - Projeto de Gerenciamento de Projetos (MCP-integrado)

## Objetivo
Desenvolver um **dashboard de gerenciamento de projetos**, com foco em freelancers e agências, utilizando **UI moderna** e **assistência via MCP (Model Context Protocol)**.

> Por enquanto, foco apenas na interface visual. Backend será implementado futuramente.

## Stack

- **Frontend**
  - React + Vite
  - TypeScript
  - ShadCN UI (principal)
- **Backend**
  - JavaScript (Node) — *não implementado ainda*

## Paleta de Cores
- `shadcn-ui` Default ou Mono

## Estrutura de Projeto

- **Painel Geral** com visão em lista
- **Categorias de Projeto**:
  - Portfólio
  - Blog
  - E-commerce
  - Site institucional
  - Landing Page
  - Dashboard administrativo
  - Outros (customizados)

- **Atributos por Projeto**:
  - Nome
  - Cliente
  - Categoria
  - Status (Planejamento, Em Progresso, Finalizado, Pausado)
  - Prioridade (Alta, Média, Baixa)
  - Datas (Criação, Entrega prevista)
  - Descrição
  - Link do projeto

## Nível de priorização
- backlog → não iniciado

- todo → próximo da fila

- in_progress → em andamento

- done → finalizado

- canceled → cancelado

- paused → pausado

- revisao → aguardando feedback do cliente
