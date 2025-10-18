const { qualidade } = require('../models');

module.exports = {
  async listar(req, res) {
    const todos = await qualidade.findAll({ include: 'ordens_producao' });
    res.json(todos);
  },
  async criar(req, res) {
    try {
      const novo = await qualidade.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }
};