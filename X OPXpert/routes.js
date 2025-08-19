const express = require('express');
const router = express.Router();
const path = require('path');

// rota inicial
router.get('/', (req, res) => {
  res.send('Olá Mundo! Dev!');
});

// rota de informações
router.get('/infos', (req, res) => {
  res.send('Aqui você encontra informações sobre o servidor');
});

// rota explícita para 404 (se alguém acessar /404 diretamente)
router.get('/404', (req, res) => {
  res.sendFile(path.join(__dirname, '404.html'));
});

module.exports = router;
