const { pedidos_compra, fornecedores } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      
      const todos = await pedidos_compra.findAll({
        include: [{
          model: fornecedores,
          as: 'fornecedor'
        }]
      });
      res.json(todos);
    } catch (err) {
      console.error("Erro ao listar pedidos de compra:", err);
      res.status(500).json({ erro: err.message });
    }
  },
  async criar(req, res) {
    try {
      const novo = await pedidos_compra.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }
};