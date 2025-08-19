console.log('Essa é a parte inicial do sistema');

const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

// importa as rotas
const routes = require('./routes');

// usa as rotas definidas no arquivo routes.js
app.use('/', routes);

// middleware para tratar rota não encontrada (404)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(port, () => {
  console.log(`App de exemplo está rodando na porta ${port}`);
});
