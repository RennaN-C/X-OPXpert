const { movimentacoes_estoque } = require('../models');

module.exports = {
  async criar(req, res) {
    try {
      const novo = await movimentacoes_estoque.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async listar(req, res) {
    const todos = await movimentacoes_estoque.findAll();
    res.json(todos);
  },

  async obter(req, res) {
    const item = await movimentacoes_estoque.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'movimentacoes_estoque não encontrado' });
    res.json(item);
  },

  async atualizar(req, res) {
    const item = await movimentacoes_estoque.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'movimentacoes_estoque não encontrado' });
    await item.update(req.body);
    res.json(item);
  },

  async deletar(req, res) {
    const item = await movimentacoes_estoque.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'movimentacoes_estoque não encontrado' });
    await item.destroy();
    res.json({ mensagem: 'movimentacoes_estoque deletado com sucesso' });
  }
};