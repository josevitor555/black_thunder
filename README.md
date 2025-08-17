### Project Management Dashboard

A modern, sleek task/project management dashboard built with React, TypeScript, and Tailwind CSS. Designed for freelancers and agencies who like to keep their chaos organized — with style, brains, and a dash of contextual AI via MCP.

---

### What Makes It Special?

- Smooth, responsive UI with Framer Motion animations
- Full backend integration with Node.js, MySQL, and JWT
- Two powerful MCPs activated:
  - shadcn-ui-server: intelligent context for all shadcn/ui components
  - Framelink Figma MCP: yes, it reads Figma and translates it into code (magic? maybe)

---

### What the Heck is MCP?

MCP (Model Context Protocol) is like the AI’s brain for your project.
Forget boring autocomplete — this thing understands your components. Mention @modal, @card, or @task, and the assistant knows exactly what you're talking about and how to help.

> 💡 Think of it as a design partner who doesn’t forget things, doesn’t sleep, and doesn’t mess up component names.

---

### Active MCPs

- shadcn-ui-server: serves up examples, structure, and docs from shadcn/ui
- Framelink Figma MCP: brings Figma prototypes to life in your code

---

### Features

- [x] Add / update / delete tasks
- [x] Filter tasks by priority and status 
- [x] Paginated task lis t
- [x] Animated modal for task creation
- [x] Reusable components (shadcn/ui, Lucide Icons)
- [x] Clean and responsive UI (Tailwind v4 + Framer Motion)

---

### Authentication (Node.js + MySQL + JWT)

User authentication will be handled via:

- **MySQL** for user data (registration & login)  
- **JWT** for secure session management  

**Endpoints:**

```http
POST   /api/register-user     → Register a new user  
POST   /api/login-user        → Log in  
DELETE /api/logout-account    → End session  
GET    /api/home              → Protected route (JWT required)
```

### Task Management (MongoDB)

```http
POST   /api/register-task     → Create a new task  
PUT    /api/update-task       → Update an existing task  
DELETE /api/delete-task/:id   → Delete task by ID

```

### Folder Structure

```plaintext
/project-root
├── backend/      → Node.js backend (auth + DB logic)
├── frontend/     → React dashboard (UI + logic + MCP)
└── README.md     → This file, obviously
```

---

### Stack used

| Layer     | Tech Used                              |
| --------- | -------------------------------------- |
| Frontend  | React + TypeScript + Vite              |
| UI        | Tailwind CSS + shadcn/ui + Lucide      |
| Animation | Framer Motion                          |
| Backend   | Node.js + MySQL + JWT + MongoDB        |
| AI Layer  | shadcn-ui-server + Framelink Figma MCP |


### Getting started

```plaintext
# backend
cd frontend
npm install
npm start
```

```plaintext
# mydashboard (frontend)
cd backend
npm install
npm run dev
```

---

### Image Project

<img width="1919" height="910" alt="Captura de tela 2025-08-01 232415" src="https://github.com/user-attachments/assets/d0e5753b-3f99-41dc-9905-a3c5e0f22c9d" />

### Author

Built with caffeine, code, and a little AI sorcery by José Vitor.
If it works? Of course. If it looks good? Hell yeah.
And yes — it speaks MCP.
