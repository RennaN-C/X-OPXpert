// server/app.js - Versão Corrigida

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const db = require("./models");

const app = express();

// --- Middlewares Essenciais ---
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "u@GF7|4aL@$Wdiv14R",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

// --- Rotas da API ---

// Importação dos arquivos de rota
const agendaRoutes = require("./routes/agenda");
const loginRoutes = require("./routes/login");
const cadastroRoutes = require("./routes/cadastro");
const funcionariosRoutes = require("./routes/funcionarios");
const produtosRoutes = require("./routes/produtos");
const logoutRoutes = require('./routes/logout');
const departamentosRoutes = require('./routes/departamentos');
const manutencoesRoutes = require('./routes/manutencoes');
const ordensProducaoRoutes = require('./routes/ordens_producao');
const movimentacoesEstoqueRoutes = require('./routes/movimentacoes_estoque'); // <-- 1. IMPORTAÇÃO ADICIONADA

// Registro das rotas
app.use("/api/agenda", agendaRoutes);
app.use("/api/funcionarios", funcionariosRoutes);
app.use("/api/produtos", produtosRoutes);
app.use("/api/departamentos", departamentosRoutes);
app.use("/api/manutencoes", manutencoesRoutes);
app.use("/api/ordens-producao", ordensProducaoRoutes);
app.use("/api/movimentacoes-estoque", movimentacoesEstoqueRoutes); // <-- 2. ROTA REGISTADA

// Rotas de autenticação
app.use("/login", loginRoutes);
app.use("/cadastro", cadastroRoutes);
app.use('/logout', logoutRoutes);

// --- Tratamento de Erros e Inicialização ---
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
    return db.sequelize.sync(); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API Server rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });