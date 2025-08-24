const express = require("express");
const path = require("path");
const app = express();

const session = require("express-session");
const logoutRoutes = require('./routes/logout');

app.use(
  session({
    secret: "u@GF7|4aL@$Wdiv14R",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1h
  })
);

// Rotas
const paginasRoutes = require("./routes/paginas"); // páginas
const agendaRoutes = require("./routes/agenda"); // API agenda
const loginRoutes = require("./routes/login"); // API login
const cadastroRoutes = require("./routes/cadastro"); //API Cadastro
const funcionariosRoutes = require("./routes/funcionarios"); // API Funcionários
const produtosRoutes = require("./routes/produtos"); // API produtos

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
app.use("/cadastro", cadastroRoutes); // CadastroAPI
app.use("/api/funcionarios", funcionariosRoutes); // Rota nova de Funcionários
app.use("/api/produtos", produtosRoutes); // Rota de produtos
app.use('/logout', logoutRoutes);

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
