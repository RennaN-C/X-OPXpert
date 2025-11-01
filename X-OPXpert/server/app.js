const express = require("express");
const session = require("express-session");
const cors = require("cors");
const db = require("./models");

const app = express();

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

const agendaRoutes = require("./routes/agenda");
const loginRoutes = require("./routes/login");
const cadastroRoutes = require("./routes/cadastro");
const funcionariosRoutes = require("./routes/funcionarios");
const produtosRoutes = require("./routes/produtos");
const logoutRoutes = require('./routes/logout');
const departamentosRoutes = require('./routes/departamentos');
const manutencoesRoutes = require('./routes/manutencoes');
const ordensProducaoRoutes = require('./routes/ordens_producao');
const movimentacoesEstoqueRoutes = require('./routes/movimentacoes_estoque');
const financeiroRoutes = require('./routes/financeiro');
const relatoriosRoutes = require('./routes/relatorios');
const clientesRoutes = require('./routes/clientes');
const fornecedoresRoutes = require('./routes/fornecedores');
const qualidadeRoutes = require('./routes/qualidade');
const pedidosCompraRoutes = require('./routes/pedidos_compra');
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios'); 

app.use("/api/agenda", agendaRoutes);
app.use("/api/funcionarios", funcionariosRoutes);
app.use("/api/produtos", produtosRoutes);
app.use("/api/departamentos", departamentosRoutes);
app.use("/api/manutencoes", manutencoesRoutes);
app.use("/api/ordens-producao", ordensProducaoRoutes);
app.use("/api/movimentacoes-estoque", movimentacoesEstoqueRoutes);
app.use("/api/financeiro", financeiroRoutes);
app.use("/api/relatorios", relatoriosRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/fornecedores", fornecedoresRoutes);
app.use("/api/qualidade", qualidadeRoutes);
app.use("/api/pedidos-compra", pedidosCompraRoutes);
app.use("/api/usuarios", usuariosRoutes); 
app.use("/api", authRoutes);
app.use("/login", loginRoutes);
app.use("/cadastro", cadastroRoutes);
app.use('/logout', logoutRoutes);


async function seedDatabase() {
  const { departamentos } = db;
  try {
    
    await departamentos.findOrCreate({ where: { nome: 'TI' }, defaults: { nome: 'TI' } });
    await departamentos.findOrCreate({ where: { nome: 'RH' }, defaults: { nome: 'RH' } });
    await departamentos.findOrCreate({ where: { nome: 'Financeiro' }, defaults: { nome: 'Financeiro' } });
    await departamentos.findOrCreate({ where: { nome: 'Vendas' }, defaults: { nome: 'Vendas' } });
    await departamentos.findOrCreate({ where: { nome: 'Marketing' }, defaults: { nome: 'Marketing' } });
    
    console.log("Departamentos padrão verificados/criados com sucesso.");
  } catch (error) {
    console.error("Erro ao popular departamentos:", error);
  }
}

app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint não encontrado" });
});

const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
    
    return db.sequelize.sync({ alter: true });
  })
  .then(() => {
   
    return seedDatabase(); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API Server rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });