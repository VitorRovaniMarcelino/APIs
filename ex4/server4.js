const express = require('express'); // Importar o express
const app = express(); // Cria o servidor
const port = 3000; // Porta do servidor -> para acessar o servidor
app.use(express.json()); // Para permitir receber json nas requisições

let posts = [
    { Id: 1, Titulo: 'Primeiro Post', conteudo: 'Conteúdo do primeiro post', autor: 'Carlos' },
    { Id: 2, Titulo: 'Segundo Post', conteudo: 'Olá, mundo!', autor: 'Ana' },
];

let comentarios = [
    { Id: 1, post_id: 1, texto: 'Ótimo post!' },
    { Id: 2, post_id: 2, texto: 'Concordo, muito bom.' },
];

let nextPostId = posts.length > 0 ? Math.max(...posts.map(t => t.Id)) + 1 : 1;
let nextComentarioId = comentarios.length > 0 ? Math.max(...comentarios.map(c => c.Id)) + 1 : 1;

function gerarNovoId() {
    return nextPostId++;
}

app.get("/", (req, res) => {
    res.send("Gerenciando Posts em um Blog");
});

app.post('/posts', (req, res) => {
    const { titulo, conteudo, autor } = req.body;
    if (!titulo || !conteudo || !autor) {
        return res.status(400).json({ erro: 'Os campos titulo, conteudo e autor são obrigatórios.' });
    }

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

app.get('/posts/:id/comentarios', (req, res) => {
    const postId = parseInt(req.params.id);
    const resultado = comentarios.filter(c => c.post_id === postId);
    res.json(resultado);
});

app.post('/posts/:id/comentarios', (req, res) => {
    const postId = parseInt(req.params.id);
    const { texto } = req.body;

    const postExiste = posts.some(p => p.Id === postId);
    if (!postExiste) {
        return res.status(404).json({ erro: 'Post não encontrado.' });
    }

    if (!texto || !texto.trim()) {
        return res.status(400).json({ erro: "O campo 'texto' é obrigatório." });
    }

    const novoComentario = {
        Id: nextComentarioId++,
        post_id: postId,
        texto: texto.trim()
    };

    comentarios.push(novoComentario);
    res.status(201).json(novoComentario);
});

app.delete('/comentarios/:id', (req, res) => {
    const comentarioId = parseInt(req.params.id);
    const index = comentarios.findIndex(c => c.Id === comentarioId);

    if (index === -1) {
        return res.status(404).json({ erro: 'Comentário não encontrado.' });
    }

    comentarios.splice(index, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
