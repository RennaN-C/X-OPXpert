# X-OPXpert (Backend) 🚀

[![X OPXpert Logo](https://raw.githubusercontent.com/RennaN-C/X-OPXpert/main/X-OPXpert/assets/img/logo.png)](https://raw.githubusercontent.com/RennaN-C/X-OPXpert/main/X-OPXpert/assets/img/logo.png)

[![Status Em Desenvolvimento](https://img.shields.io/badge/STATUS-EM%20DESENVOLVIMENTO-green)](https://github.com/RennaN-C/X-OPXpert)
[![GitHub language count](https://img.shields.io/github/languages/count/RennaN-C/X-OPXpert?color=%2304D361)](https://github.com/RennaN-C/X-OPXpert)
[![Repository size](https://img.shields.io/github/repo-size/RennaN-C/X-OPXpert)](https://github.com/RennaN-C/X-OPXpert)
[![GitHub last commit](https://img.shields.io/github/last-commit/RennaN-C/X-OPXpert)](https://github.com/RennaN-C/X-OPXpert)

---

## 💻 Sobre o projeto

**X-OPXpert (Backend)** é o servidor e a API central do sistema de **gestão de ordens de produção**. Ele é responsável por toda a lógica de negócios, gerenciamento de banco de dados e comunicação com o cliente frontend.

Este backend foi desenvolvido para fornecer uma API RESTful robusta e segura para o [**X-OPXpert Frontend**](https://github.com/RennaN-C/x-opxpert-frontend), permitindo o gerenciamento completo do ciclo de produção.

### Frontend

O código-fonte do cliente (interface web) está em um repositório separado.

➡️ **Acesse o repositório do Frontend aqui: [RennaN-C/x-opxpert-frontend](https://github.com/RennaN-C/x-opxpert-frontend)**

---

## ⚙️ Funcionalidades do Backend

* **API para Gestão de Ordens de Produção**:
    * Criar, ler, atualizar e deletar (CRUD) ordens.
    * Endpoints para acompanhamento de status (Em andamento, Concluída, Pendente).
    * Gerenciamento de prioridades.
* **API para Controle de Materiais**:
    * Endpoints para registrar entradas e saídas de materiais.
    * Monitoramento de estoque.
* **API para Gestão de Equipes**:
    * Endpoints para atribuir funcionários a ordens de produção.
    * Registro de histórico de operações.
* **Autenticação e Autorização**:
    * Endpoints de login e gerenciamento de sessão (via `express-session`).
    * Proteção de rotas e criptografia de senhas (via `bcrypt`).

---

## 🛠 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript no servidor.
* **Express**: Framework para construção da API RESTful.
* **Sequelize**: ORM para interação com o banco de dados.
* **PostgreSQL**: Banco de dados relacional.
* **Dotenv**: Gerenciamento de variáveis de ambiente.
* **Bcrypt**: Criptografia de senhas.
* **Express-session**: Gerenciamento de sessões de usuário.

---

## 📦 Dependências do Backend

### Dependências de produção

* bcrypt ^6.0.0
* bcryptjs ^3.0.2
* dotenv ^17.2.1
* express ^5.1.0
* express-session ^1.18.2
* pg ^8.16.3
* pg-hstore ^2.3.4
* sequelize ^6.37.7

### Dependências de desenvolvimento

* nodemon ^3.1.10
* sequelize-auto ^0.8.8

---

## 🛣️ Como executar o projeto (Backend)

### Pré-requisitos

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/) (v18 ou superior)
* [PostgreSQL](https://www.postgresql.org/) (um banco de dados rodando localmente ou em um container)

### Rodando o Backend (Servidor)

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/RennaN-C/X-OPXpert.git](https://github.com/RennaN-C/X-OPXpert.git)
    cd X-OPXpert/X-OPXpert
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    * Crie um arquivo `.env` na raiz do projeto (`X-OPXpert/X-OPXpert/.env`).
    * Adicione as variáveis necessárias para a conexão com o banco de dados (PostgreSQL). Use o arquivo `sequelize.config.js` (ou similar) como referência para saber quais variáveis são esperadas (ex: `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_PORT`).

    *Exemplo de `.env`:*
    ```env
    DB_HOST=localhost
    DB_USER=seu_usuario_postgres
    DB_PASS=sua_senha_postgres
    DB_NAME=x_opxpert_db
    DB_PORT=5432
    SESSION_SECRET=seu_segredo_de_sessao
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  O servidor estará rodando em `http://localhost:8080` (ou na porta definida em suas variáveis de ambiente).

---

## 🗺️ Estrutura da API (Endpoints Principais)

* `POST /api/login` - Autentica um usuário.
* `GET /api/ordens` - Lista todas as ordens de produção.
* `POST /api/ordens` - Cria uma nova ordem.
* `GET /api/ordens/:id` - Busca uma ordem específica.
* `PUT /api/ordens/:id` - Atualiza uma ordem específica.
* `DELETE /api/ordens/:id` - Deleta uma ordem.
