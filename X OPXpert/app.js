const express = require("express");
const path = require("path");
const app = express();

const paginasRoutes = require("./routes/paginas"); // Rotas para páginas HTML
const agendaRoutes = require('./routes/agenda'); // Rotas para API agenda

const db = require('./models'); // Importa Sequelize e modelos

// Middleware para interpretar JSON
app.use(express.json());

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "assets")));

// Rotas para páginas HTML
app.use("/", paginasRoutes);

// Rotas API agenda
app.use('/api/agenda', agendaRoutes);

const PORT = process.env.APP_PORT || 3000;

// Middleware para página 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// **Conectar ao banco antes de iniciar servidor**
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco com sucesso!");
    return db.sequelize.sync(); // Opcional, para sincronizar modelos
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco:", err);
  });
