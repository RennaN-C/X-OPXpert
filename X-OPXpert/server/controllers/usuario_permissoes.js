const { usuario_permissoes } = require('../models');

module.exports = {
  async criar(req, res) {
    try {
      const novo = await usuario_permissoes.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async listar(req, res) {
    const todos = await usuario_permissoes.findAll();
    res.json(todos);
  },

  async obter(req, res) {
    const item = await usuario_permissoes.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'usuario_permissoes não encontrado' });
    res.json(item);
  },

  async atualizar(req, res) {
    const item = await usuario_permissoes.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'usuario_permissoes não encontrado' });
    await item.update(req.body);
    res.json(item);
  },

  async deletar(req, res) {
    const item = await usuario_permissoes.findByPk(req.params.id);
    if (!item) return res.status(404).json({ erro: 'usuario_permissoes não encontrado' });
    await item.destroy();
    res.json({ mensagem: 'usuario_permissoes deletado com sucesso' });
  }
};