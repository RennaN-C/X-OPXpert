// controllers/relatorios.js
const { relatorios, usuarios } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const todos = await relatorios.findAll({
        include: [{
          model: usuarios,
          as: 'criador',
          attributes: ['nome_completo'] // Puxa apenas o nome completo do usuário
        }]
      });
      res.json(todos);
    } catch (err) {
      console.error("Erro ao listar relatórios:", err);
      res.status(500).json({ erro: err.message });
    }
  },

  async criar(req, res) {
    try {
      // Para funcionar, vamos assumir que o ID do criador pode ser nulo por agora
      // O ideal seria pegar da sessão: req.body.criado_por = req.session.usuarioLogado.id;
      const novo = await relatorios.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  // As funções obter, atualizar e deletar podem ser mantidas como estavam.
  async obter(req, res) {
    const item = await relatorios.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'relatorio não encontrado' });
    res.json(item);
  },

  async atualizar(req, res) {
    const item = await relatorios.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'relatorio não encontrado' });
    await item.update(req.body);
    res.json(item);
  },

  async deletar(req, res) {
    const item = await relatorios.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'relatorio não encontrado' });
    await item.destroy();
    res.json({ mensagem: 'relatorio deletado com sucesso' });
  }
};