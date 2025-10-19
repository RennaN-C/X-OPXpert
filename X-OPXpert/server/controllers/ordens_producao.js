// server/controllers/ordens_producao.js - Versão Final e Corrigida
const { ordens_producao, usuarios } = require('../models');

module.exports = {
  async criar(req, res) {
    try {
      const novo = await ordens_producao.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async listar(req, res) {
    try {
      const todos = await ordens_producao.findAll({
        include: [{
            model: usuarios,
            as: 'criador', // Usa o alias definido em init-models.js
            attributes: ['nome_completo']
        }]
      });
      res.json(todos);
    } catch (err) {
      console.error("Erro ao listar ordens de produção:", err);
      res.status(500).json({ erro: "Erro interno do servidor ao buscar ordens." });
    }
  },

  async obter(req, res) {
    try {
      const item = await ordens_producao.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: 'Ordem de produção não encontrada' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ erro: "Erro interno do servidor." });
    }
  },

  async atualizar(req, res) {
    try {
      const item = await ordens_producao.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: 'Ordem de produção não encontrada' });
      await item.update(req.body);
      res.json(item);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const item = await ordens_producao.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: 'Ordem de produção não encontrada' });
      await item.destroy();
      res.json({ mensagem: 'Ordem de produção deletada com sucesso' });
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }
};