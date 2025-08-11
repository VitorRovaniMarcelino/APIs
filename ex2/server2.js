const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const produtos = [
  { id: 1, Nome: 'Teclado Mecânico', Preço: 350.00, emEstoque: true },
  { id: 2, Nome: 'Mouse Gamer', Preço: 180.00, emEstoque: true },
  { id: 3, Nome: 'Mouse Ultrawide', Preço: 1500.00, emEstoque: true },
];

app.get("/", (req, res) => {
  res.send("Servidor de Lista de Tarefas - CRUD");
});

app.get('/produtos/em-estoque', (req, res) => {
  const produtosEmEstoque = produtos.filter(p => p.emEstoque);
  res.json(produtosEmEstoque);
});

app.get('/produtos/pesquisar', (req, res) => {
  const nomeBusca = req.query.nome;
  if (!nomeBusca) {
      return res.status(400).json({ erro: 'Parâmetro "nome" é obrigatório' });
  }
  const resultado = produtos.filter(p => 
      p.Nome.toLowerCase().includes(nomeBusca.toLowerCase())
  );
  res.json(resultado);
});

app.patch('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const novoPreco = req.body.Preço;

  if (novoPreco === undefined) {
      return res.status(400).json({ erro: 'O novo preço é obrigatório' });
  }
  if (typeof novoPreco !== 'number' || novoPreco < 0) {
      return res.status(400).json({ erro: 'Preço inválido' });
  }

  const produto = produtos.find(p => p.id === id);
  if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  produto.Preço = novoPreco;
  res.json(produto);
});

app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const novoProduto = req.body;

  if (!novoProduto.categoria) {
      return res.status(400).json({ erro: 'A propriedade "categoria" é obrigatória' });
  }

  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
  }

  produtos[index] = { id, ...novoProduto };

  res.json(produtos[index]);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});