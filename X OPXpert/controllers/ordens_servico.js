const { ordens_servico } = require('../models');

module.exports = {
  async criar(req, res) {
    try {
      const novo = await ordens_servico.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async listar(req, res) {
    const todos = await ordens_servico.findAll();
    res.json(todos);
  },

  async obter(req, res) {
    const item = await ordens_servico.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'ordens_servico não encontrado' });
    res.json(item);
  },

  async atualizar(req, res) {
    const item = await ordens_servico.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'ordens_servico não encontrado' });
    await item.update(req.body);
    res.json(item);
  },

  async deletar(req, res) {
    const item = await ordens_servico.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'ordens_servico não encontrado' });
    await item.destroy();
    res.json({ mensagem: 'ordens_servico deletado com sucesso' });
  }
};