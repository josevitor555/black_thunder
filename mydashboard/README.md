### Project Management Dashboard

A modern task/project management dashboard built with **React**, **TypeScript**, and **Tailwind CSS**, designed to help **freelancers and agencies** organize and prioritize client projects. It includes smart filtering, priority tagging, smooth UI animations, and a powerful AI-assisted context system powered by **MCP**.

---

### What is MCP?

To build this project, we used a protocol called **MCP Server (Model Context Protocol)** — think of it as a living manual or design library for the AI. It acts as a contextual brain: every time you mention `@modal`, `@button`, or `@card`, the assistant instantly understands what UI component to render and how to behave.

Feels like magic? It’s not — it’s **contextual intelligence**.

> It's not just autocomplete. It's co-pilot UI design powered by shared understanding.

---

### MVP Features

- ✅ Add / update / delete tasks  
- ✅ Filter by priority and status  
- ✅ Paginated task list  
- ✅ Animated modal for task creation  
- ✅ Component system using `shadcn/ui` + `Lucide` icons  
- ✅ Clean and responsive UI (Tailwind CSS v4 + Framer Motion)

---

### Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React + TypeScript + Vite           |
| UI        | Tailwind CSS + shadcn/ui + Lucide   |
| Animation | Framer Motion                       |
| Backend   | Node.js *(Coming soon)*             |
| AI Layer  | MCP Server (Model Context Protocol) |

---

### More on MCP

The **MCP Server** is a central component within the Model Context Protocol (MCP) ecosystem. It acts as a bridge between AI models and your project’s tools, codebase, and data sources.

In this project, MCP enables:

- **Creating layouts** based on design tokens and `shadcn/ui` presets  
- **Context-awareness** for components, styling, and user interactions  
- **Component references** via `@mentions` (e.g., `@card`, `@task`, `@priorityBadge`)

Each MCP server is unique, tailored to the specific needs of the project it serves.

---

### Authentication *(Coming Soon)*

User authentication will be handled via:

- **MySQL** for user data (registration & login)  
- **JWT** for secure session management  

**Endpoints:**

```http
POST   /api/register-user     → Register new user  
POST   /api/login-user        → Log in  
DELETE /api/logout-account    → Delete user session  
GET    /api/home              → Protected route (JWT required)
```

### Project / Task Management (MongoDB)

```http
POST   /api/register-task     → Create a new task  
PUT    /api/update-task       → Update an existing task  
DELETE /api/delete-task/:id   → Delete task by ID

```

### Folder Structure

```plaintext
/project-root
│
├── backend/      → Node.js backend (auth + DB logic)
├── frontend/     → React dashboard (UI & logic)
└── README.md     → This file
```

---

### Getting Start

```plaintext
# Frontend
cd frontend
npm install
npm run dev
```

### Image Project

<img width="1919" height="910" alt="Captura de tela 2025-08-01 232415" src="https://github.com/user-attachments/assets/161af6a8-7ed9-44ed-9d79-e2e587e67c0f" />

---

### Author

Made with 🔥, code, and a touch of AI by José Vitor
