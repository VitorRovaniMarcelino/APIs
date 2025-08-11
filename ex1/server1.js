const express = require('express'); // Importar o express
const app = express(); // Cria o servidor
const port = 3000; // Porta do servidor -> para acessar o servidor
app.use(express.json()); // Para permitir receber json nas requisições

let tarefas = [
    { Id: 1, "Titulo": 'Estudar Express', "Concluida": false },
    { Id: 2, "Titulo": 'Fazer Exercícios', "Concluida": false },
];

//IDs únicos
let nextId = tarefas.length > 0 ? Math.max(...tarefas.map(t => t.Id)) + 1 : 1;

app.get("/", (req, res) => {
    res.send("Servidor de Lista de Tarefas - CRUD");
});

//READ ALL
app.get("/tarefas", (req, res) => {
    res.send(tarefas);
});

//READ ONE
app.get("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.Id === id);

    if (tarefa) {
        res.send(tarefa);
    } else {
        res.status(404).send("Tarefa não encontrada!");
    }
});

//CREATE
app.post("/tarefas", (req, res) => {
    const novaTarefa = req.body;
    novaTarefa.Id = nextId++;
    tarefas.push(novaTarefa);

    res.status(201).send(novaTarefa);
});

//UPDATE
app.put("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const novaTarefa = req.body;
    novaTarefa.Id = id;

    const index = tarefas.findIndex(t => t.Id === id);

    if (index !== -1) {
        tarefas[index] = novaTarefa;
        res.send(novaTarefa);
    } else {
        res.status(404).send("Tarefa não encontrada!");
    }
});

//DELETE
app.delete("/tarefas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tarefas.findIndex(t => t.Id === id);

    if (index !== -1) {
        tarefas.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send("Tarefa não encontrada!");
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});