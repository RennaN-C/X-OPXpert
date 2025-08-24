const express = require("express");
const path = require("path");
const app = express();

// Rotas
const paginasRoutes = require("./routes/paginas"); // HTML pages
const agendaRoutes = require("./routes/agenda"); // API for agenda
const loginRoutes = require("./routes/login"); // API for login (new)
const cadastroRoutes = require('./routes/cadastro'); //API Cadastro

// Banco de dados (Sequelize)
const db = require("./models");

// Middlewares
app.use(express.json()); // Para JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Para form-urlencoded

// Arquivos estáticos (css, js, imagens, etc)
app.use(express.static(path.join(__dirname, "assets")));

// Rotas
app.use("/", paginasRoutes); // Páginas HTML
app.use("/api/agenda", agendaRoutes); // API agenda
app.use("/login", loginRoutes); // Login API
app.use('/cadastro', cadastroRoutes); // CadastroAPI

// Página 404 para rotas não encontradas
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

const PORT = process.env.APP_PORT || 3000;

// Conectar ao banco de dados e iniciar o servidor
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco com sucesso!");
    return db.sequelize.sync(); // Pode ser removido se já estiver tudo migrado
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco:", err);
  });
