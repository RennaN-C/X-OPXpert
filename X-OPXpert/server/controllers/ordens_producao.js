// server/controllers/ordens_producao.js

// Importa o db para podermos usar o sequelize para consultas diretas
const db = require('../models'); 
const { ordens_producao } = require('../models');

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
      // --- ALTERAÇÃO PRINCIPAL AQUI ---
      // Em vez de um simples 'findAll', vamos usar uma consulta SQL pura (raw query)
      // para chamar a nossa função 'progresso_ordem' para cada ordem.
      const query = `
        SELECT 
          *, 
          public.progresso_ordem(id_ordem) as progresso 
        FROM 
          public.ordens_producao
      `;
      
      const todos = await db.sequelize.query(query, {
        type: db.Sequelize.QueryTypes.SELECT
      });

      res.json(todos);

    } catch (err) {
      console.error("Erro ao listar ordens de produção:", err);
      res.status(500).json({ erro: "Erro interno do servidor." });
    }
  },

  async obter(req, res) {
    try {
      // Também podemos adicionar o progresso quando se busca um único item
      const query = `
        SELECT 
          *, 
          public.progresso_ordem(id_ordem) as progresso 
        FROM 
          public.ordens_producao 
        WHERE 
          id_ordem = :id_ordem
      `;

      const [item] = await db.sequelize.query(query, {
        replacements: { id_ordem: req.params.id },
        type: db.Sequelize.QueryTypes.SELECT
      });

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
      
      // O trigger 'trg_status_ordem_producao' vai cuidar de atualizar o status automaticamente!
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