const express = require('express'); // Importar o express
const app = express(); // Cria o servidor
const port = 3000; // Porta do servidor -> para acessar o servidor
app.use(express.json()); // Para permitir receber json nas requisições

let posts = [
    { Id: 1, "Titulo": 'Primeiro Post', conteudo: 'Conteúdo do primeiro post', autor: 'Carlos' },
    { Id: 2, "Titulo": 'Segundo Post', conteudo: "Olá, mundo!", autor: 'Ana' },
];

let nextId = posts.length > 0 ? Math.max(...posts.map(t => t.Id)) + 1 : 1;

app.get("/", (req, res) => {
    res.send("Gerenciando Posts em um Blog");
});

app.post('/posts', (req, res) => {
    const { titulo, conteudo, autor } = req.body;
    const novoPost = {
        Id: gerarNovoId(),
        Titulo: titulo.trim(),
        conteudo: conteudo.trim(),
        autor: autor.trim(),
    };
    posts.push(novoPost);
    res.status(201).json(novoPost);
});

app.get('/posts/autor/:autor', (req, res) => {
    const autorBusca = req.params.autor.toLowerCase();
    const resultado = posts.filter(p => p.autor.toLowerCase() === autorBusca);
    res.json(resultado);
});

app.patch('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const novoConteudo = req.body.conteudo;

    if (!novoConteudo || !novoConteudo.trim()) {
        return res.status(400).json({ erro: 'O novo conteudo é obrigatório e não pode estar vazio.' });
    }

    const post = posts.find(p => p.Id === id);
    if (!post) {
        return res.status(404).json({ erro: 'Post não encontrado.' });
    }

    post.conteudo = novoConteudo.trim();
    res.json(post);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});