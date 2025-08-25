const express = require('express'); // Importar o express

const cors = require('cors'); // Importar o CORS

const app = express(); // Cria o servidor

const port = 3000; // Porta do servidor -> para acessar o servidor

app.use(express.json()); // Para permitir receber json nas requisições
app.use(cors());

const usuarios = [
    {"Id": 1, "Nome": "Rovani", "Idade": 18, "Senha": "456"},
    {"Id": 2, "Nome": "Pedro", "Idade": 15, "Senha": "789"},

]

// request - requisição
// response - resposta
app.get("/", (req, res) => {
    res.send("Primeiro servidor AIPSII/2025 - Malwee")
})

//Buscar todos os usuários
app.get("/usuario", (req, res) => {
    // send -> envia os dados
    res.send(usuarios);
})

// Buscar um usuário -> get by id
app.get("/usuario/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const usuario = usuarios.find(usuario => usuario.Id == id);

    if(usuario != null){
        res.send(usuario)
    }else{
        res.status(404).send("Usuário não encontrado!")
    }
})

// Criar um usuário
app.post("/usuarios", (req, res) => {
    //body - corpo da requisição (Fica "Invisivel")
    //params - parametros (fica na url)
    const novoUsuario = req.body;
    novoUsuario.id = usuarios.length + 1;
    usuarios.push(novoUsuario);


    res.status(201).send(novoUsuario)
})

app.put("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const novoUsuario = req.body;
    novoUsuario.id = id;
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if(index != null){
        usuarios[index] = novoUsuario;
        res.status(204).send(novoUsuario);
    }else{
        res.status(404).send("Usuário não encontrado!")
    }

})

// deletar um usuário
app.delete("/usuarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(usuario => usuario.id == id);

    if(index != null){
        usuarios.splice(index, 1);
        res.status(204).send("Usuário com id " + id + "removido com sucesso!")
    }else{
        res.status(404).send("Usuário não encontrado!")
    }
})

app.listen(port, () => { // Rodar o servidor
    console.log("Servidor rodando em http://localhost:3000")
})