// server/controllers/movimentacoes_estoque.js - Versão Completa e Corrigida

const db = require('../models');
const { movimentacoes_estoque } = require('../models');

module.exports = {
  // --- Função que usa a nova procedure ---
  async criar(req, res) {
    const { id_produto, quantidade, tipo, observacao } = req.body;

    if (!id_produto || !quantidade || !tipo) {
        return res.status(400).json({ erro: "Os campos 'id_produto', 'quantidade' e 'tipo' são obrigatórios." });
    }

    try {
      // Chama a função 'registrar_movimentacao_estoque' que criámos no banco de dados
      const [results] = await db.sequelize.query(
        'SELECT public.registrar_movimentacao_estoque(:id_produto, :quantidade, :tipo, :observacao) as nova_quantidade',
        {
          replacements: {
            id_produto: id_produto,
            quantidade: quantidade,
            tipo: tipo,
            observacao: observacao || null
          },
          type: db.Sequelize.QueryTypes.SELECT
        }
      );

      res.status(201).json({
        mensagem: `Movimentação do tipo '${tipo}' registada com sucesso.`,
        nova_quantidade: results.nova_quantidade
      });

    } catch (err) {
      // Captura os erros lançados pela procedure (ex: 'Stock insuficiente')
      res.status(400).json({ erro: err.message });
    }
  },

  // --- Funções restantes que estavam em falta ---
  async listar(req, res) {
    try {
      const todos = await movimentacoes_estoque.findAll();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar movimentações." });
    }
  },

  async obter(req, res) {
    try {
      const item = await movimentacoes_estoque.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: 'Movimentação não encontrada' });
      res.json(item);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao obter movimentação." });
    }
  },

  async atualizar(req, res) {
    try {
      const item = await movimentacoes_estoque.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: 'Movimentação não encontrada' });
      await item.update(req.body);
      res.json(item);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const item = await movimentacoes_estoque.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: 'Movimentação não encontrada' });
      await item.destroy();
      res.json({ mensagem: 'Movimentação deletada com sucesso' });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar movimentação." });
    }
  }
};