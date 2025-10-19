// controllers/authController.js

// Verifica se existe uma sessão de utilizador ativa
exports.checkAuth = (req, res) => {
  if (req.session && req.session.usuarioLogado) {
    // Se a sessão existe, retorna os dados do utilizador
    return res.status(200).json({ usuarioLogado: req.session.usuarioLogado });
  } else {
    // Se não existe, retorna um erro de não autorizado
    return res.status(401).json({ mensagem: "Utilizador não autenticado." });
  }
};