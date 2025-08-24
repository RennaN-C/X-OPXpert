const express = require("express");
const path = require("path");
const router = express.Router();

const viewsPath = path.join(__dirname, "../views");

// Rota para a página inicio.html
router.get("/inicio", (req, res) => {
  res.sendFile(path.join(viewsPath, "inicio.html"));
});

// Rota para a página login.html
router.get("/login", (req, res) => {
  res.sendFile(path.join(viewsPath, "login.html"));
});

// Rota para a página cadastro.html
router.get("/cadastro", (req, res) => {
  res.sendFile(path.join(viewsPath, "cadastro.html"));
});

// Rota para a página configuracoes.html
router.get("/configuracoes", (req, res) => {
  res.sendFile(path.join(viewsPath, "configuracoes.html"));
});

// Rota para a página funcoes.html
router.get("/funcoes", (req, res) => {
  res.sendFile(path.join(viewsPath, "funcoes.html"));
});

router.get("/agenda", (req, res) => {
  res.sendFile(path.join(viewsPath, "agenda.html"));
});

module.exports = router;
