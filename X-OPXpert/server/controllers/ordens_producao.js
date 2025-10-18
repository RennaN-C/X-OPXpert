// server/controllers/ordens_producao.js - Versão Corrigida
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
      // SUBSTITUÍDO: Usando o método padrão do Sequelize que é mais seguro
      const todos = await ordens_producao.findAll({
        include: [{
            model: usuarios,
            as: 'criador',
            attributes: ['nome_completo'] // Opcional: para pegar o nome de quem criou
        }]
      });
      res.json(todos);
    } catch (err) {
      console.error("Erro ao listar ordens de produção:", err);
      res.status(500).json({ erro: "Erro interno do servidor." });
    }
  },

  async obter(req, res) {
    try {
      const item = await ordens_producao.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: 'Ordem de produção não encontrada' });
      res.json(item);
    } catch (err) {
      console.error("Erro ao obter ordem de produção:", err);
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