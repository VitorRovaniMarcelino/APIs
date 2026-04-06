# 🌐 API de Gerenciamento de Usuários

[![Node.js Version](https://img.shields.io/badge/node-v14%2B-green.svg)](https://nodejs.org/)
[![Express Version](https://img.shields.io/badge/express-v4.18%2B-blue.svg)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Esta é uma API RESTful simples desenvolvida em **JavaScript** com **Node.js** e **Express**. O objetivo é fornecer um sistema de CRUD (Create, Read, Update, Delete) para persistência de dados de usuários.

---

## 🛠️ Tecnologias Utilizadas

*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express](https://expressjs.com/)
*   **Segurança:** [CORS](https://www.npmjs.com/package/cors)
*   **Ferramenta de Teste:** [Postman](https://www.postman.com/)

---

# 🚀 Como Executar o Projeto

## 📌 Pré-requisitos
Certifique-se de ter o **Node.js** instalado em sua máquina.

---

## ▶️ Passo a passo

### 1. Clone o repositório
```bash
git clone https://github.com/VitorRovaniMarcelino/APIs.git
```

### 2. Acesse a pasta do projeto
```bash
cd APIs
```

### 3. Instale as dependências
```bash
npm install
```

### 4. Inicie o servidor
```bash
npm start
```

---


## 🌐 Acesso
O servidor iniciará, por padrão, na porta 3000.

---

## 🛣️ Endpoints da API

| Método | Endpoint        | Descrição                                                     |
|--------|----------------|----------------------------------------------------------------|
| GET    | `/`            | Retorna a mensagem de boas-vindas do servidor.                |
| GET    | `/usuario`     | Retorna a lista de todos os usuários.                         |
| GET    | `/usuario/:id` | Busca um usuário específico pelo ID.                          |
| POST   | `/usuarios`    | Cria um novo usuário (ID gerado automaticamente).             |
| PUT    | `/usuarios/:id`| Atualiza os dados de um usuário existente.                    |
| DELETE | `/usuarios/:id`| Remove um usuário do sistema.                                 |
