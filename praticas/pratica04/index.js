const express = require("express");
const app = express();

// Array em memória com tarefas
const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// Middleware para parsear JSON
app.use(express.json());

// Middleware global de log de requisições
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Criação do roteador
const router = express.Router();

// GET /tarefas → lista todas as tarefas
router.get("/", (req, res) => {
  res.json(tarefas);
});

// POST /tarefas → cria nova tarefa
router.post("/", (req, res) => {
  const { nome, concluida } = req.body;

  const novaTarefa = {
    id: tarefas.length + 1,
    nome,
    concluida: concluida || false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// GET /tarefas/:tarefaId → busca por ID
router.get("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return next(new Error("Tarefa não localizada"));
  }

  res.json(tarefa);
});

// PUT /tarefas/:tarefaId → atualiza tarefa
router.put("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return next(new Error("Tarefa não localizada"));
  }

  tarefa.nome = req.body.nome ?? tarefa.nome;
  tarefa.concluida = req.body.concluida ?? tarefa.concluida;

  res.json(tarefa);
});

// DELETE /tarefas/:tarefaId → remove tarefa
router.delete("/:tarefaId", (req, res, next) => {
  const id = parseInt(req.params.tarefaId);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) {
    return next(new Error("Tarefa não localizada"));
  }

  tarefas.splice(index, 1);
  res.status(204).send();
});

// Usa o router nas rotas iniciando com /tarefas
app.use("/tarefas", router);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  res.status(400).json({ erro: err.message });
});

// Inicializa o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

// Exporta a instância da aplicação
module.exports = app;
