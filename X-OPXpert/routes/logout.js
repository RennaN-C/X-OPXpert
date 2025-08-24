const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao destruir sessão:', err);
      return res.status(500).json({ mensagem: 'Erro interno ao fazer logout.' });
    }
    res.clearCookie('connect.sid'); // limpa o cookie da sessão
    return res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
  });
});

module.exports = router;