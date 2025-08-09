# 🚀 **ROTAS MONGODB - TAREFAS/PROJETOS**

## 📍 **Base URL:**
```
http://localhost:3000/api/tasks
```

## 🔧 **ENDPOINTS DISPONÍVEIS:**

### **1. CREATE TASK/PROJECT**
- **Método:** `POST`
- **URL:** `/create-task`
- **Body (JSON):**
```json
{
  "nome": "Desenvolver Landing Page",
  "clienteId": "507f1f77bcf86cd799439011",
  "status": "todo",
  "prioridade": "alta",
  "descricao": "Criar landing page responsiva para empresa de tecnologia",
  "categoria": "Desenvolvimento Web",
  "dataEntrega": "2024-02-15",
  "link": "https://github.com/projeto",
  "notas": "Prioridade alta para o cliente"
}
```

**Campos Obrigatórios:**
- `nome` (String)
- `clienteId` (ObjectId válido)
- `status` (String - enum)
- `prioridade` (String - enum)
- `descricao` (String)

**Campos Opcionais:**
- `categoria` (String)
- `dataEntrega` (Date)
- `link` (String)
- `notas` (String)

**Enums Válidos:**
- **Status:** `['backlog', 'todo', 'in_progress', 'done', 'canceled', 'paused', 'revisao']`
- **Prioridade:** `["baixa", "media", "alta"]`

---

### **2. UPDATE TASK/PROJECT**
- **Método:** `PUT`
- **URL:** `/update-task/:id`
- **Body (JSON):**
```json
{
  "nome": "Landing Page Atualizada",
  "status": "in_progress",
  "prioridade": "media"
}
```

**Parâmetros:**
- `:id` - ID da tarefa/projeto no MongoDB

---

### **3. DELETE TASK/PROJECT**
- **Método:** `DELETE`
- **URL:** `/delete-task/:id`

**Parâmetros:**
- `:id` - ID da tarefa/projeto no MongoDB

---

### **4. GET ALL TASKS/PROJECTS**
- **Método:** `GET`
- **URL:** `/tasks`

**Resposta inclui:**
- Lista de todas as tarefas/projetos
- Populate do `clienteId` (nome e email)

---

### **5. GET TASK/PROJECT BY ID**
- **Método:** `GET`
- **URL:** `/tasks/:id`

**Parâmetros:**
- `:id` - ID da tarefa/projeto no MongoDB

**Resposta inclui:**
- Dados da tarefa/projeto
- Populate do `clienteId` (nome e email)

---

## 🗄️ **ESTRUTURA DO BANCO:**

**Database:** `dashboard_task`
**Collections:**
- `clients` - Clientes
- `categories` - Categorias
- `projects` - **Tarefas/Projetos** (onde as tarefas são salvas)
- `status_projects` - Status dos projetos

## 📝 **EXEMPLOS POSTMAN:**

### **Criar Tarefa:**
```
POST http://localhost:3000/api/tasks/create-task
Content-Type: application/json

{
  "nome": "Desenvolver Landing Page",
  "clienteId": "507f1f77bcf86cd799439011",
  "status": "todo",
  "prioridade": "alta",
  "descricao": "Criar landing page responsiva para empresa de tecnologia"
}
```

### **Atualizar Tarefa:**
```
PUT http://localhost:3000/api/tasks/update-task/507f1f77bcf86cd799439012
Content-Type: application/json

{
  "status": "in_progress",
  "prioridade": "media"
}
```

### **Buscar Tarefa:**
```
GET http://localhost:3000/api/tasks/tasks/507f1f77bcf86cd799439012
```

### **Deletar Tarefa:**
```
DELETE http://localhost:3000/api/tasks/delete-task/507f1f77bcf86cd799439012
```
