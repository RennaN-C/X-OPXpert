exports.checkAuth = (req, res) => {
  if (req.session && req.session.usuarioLogado) {
    
    return res.status(200).json({ usuarioLogado: req.session.usuarioLogado });
  } else {
    
    return res.status(401).json({ mensagem: "Utilizador não autenticado." });
  }
};