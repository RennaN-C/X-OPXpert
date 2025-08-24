const express = require("express");
const path = require("path");
const router = express.Router();

const viewsPath = path.join(__dirname, "../views");

// Middleware de autenticação que você deve criar (exemplo básico)
function autenticar(req, res, next) {
  if (req.session && req.session.usuarioLogado) {
    next(); // usuário autenticado, pode prosseguir
  } else {
    res.redirect("/login"); // não autenticado, redireciona para login
  }
}

router.get("/inicio", autenticar, (req, res) => {
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

router.get("/configuracoes", autenticar, (req, res) => {
  res.sendFile(path.join(viewsPath, "configuracoes.html"));
});

// Aqui adiciona o middleware para proteger a rota
router.get("/funcoes", autenticar, (req, res) => {
  res.sendFile(path.join(viewsPath, "funcoes.html"));
});

router.get("/agenda",  (req, res) => {
  res.sendFile(path.join(viewsPath, "agenda.html"));
});

module.exports = router;
