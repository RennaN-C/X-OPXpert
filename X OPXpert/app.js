const express = require("express");
const path = require("path");
const app = express();

const paginasRoutes = require("./routes/paginas"); // Rotas para páginas HTML

// Middleware para interpretar JSON (se precisar no futuro)
app.use(express.json());

// Servir arquivos estáticos (CSS, JS, imagens) da pasta /assets
app.use(express.static(path.join(__dirname, "assets")));

// Rotas para servir páginas HTML
app.use("/", paginasRoutes);

const PORT = process.env.APP_PORT || 3000;

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
