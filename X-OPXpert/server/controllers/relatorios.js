const { relatorios, usuarios, ordens_producao, sequelize, clientes } = require('../models');
const { Op } = require('sequelize');

module.exports = {

  async gerarRelatorioProducao(req, res) {
    try {
      const stats = await ordens_producao.findAll({
        attributes: [
          'status',
          [sequelize.fn('COUNT', sequelize.col('id_ordem')), 'total'],
          [sequelize.fn('SUM', sequelize.col('quantidade_produzida')), 'total_produzido'],
          [sequelize.fn('SUM', sequelize.col('perdas')), 'total_perdas']
        ],
        group: ['status'],
        raw: true
      });

      const kpis = stats.reduce((acc, item) => {
        acc[item.status] = {
          total: parseInt(item.total, 10),
          total_produzido: parseInt(item.total_produzido || 0, 10),
          total_perdas: parseInt(item.total_perdas || 0, 10)
        };
        return acc;
      }, {});

      const recentesConcluidas = await ordens_producao.findAll({
        where: { status: 'Concluída' },
        order: [['data_conclusao', 'DESC']],
        limit: 20,
        include: [
          { model: usuarios, as: 'responsavel', attributes: ['nome_completo'] },
          { model: clientes, as: 'cliente', attributes: ['nome_razao_social'] }
        ]
      });

      const pendentes = await ordens_producao.findAll({
        where: {
          status: { [Op.in]: ['Aberta', 'Em Execução'] }
        },
        order: [['data_inicio', 'ASC']],
        limit: 20,
        include: [
          { model: usuarios, as: 'responsavel', attributes: ['nome_completo'] },
          { model: clientes, as: 'cliente', attributes: ['nome_razao_social'] }
        ]
      });

      const relatorioProducao = {
        kpis,
        recentesConcluidas,
        pendentes
      };

      res.json(relatorioProducao);

    } catch (err) {
      console.error("Erro ao gerar relatório de produção:", err);
      res.status(500).json({ erro: err.message });
    }
  },

  async listar(req, res) {
    try {
      const todos = await relatorios.findAll({
        include: [{
          model: usuarios,
          as: 'criador',
          attributes: ['nome_completo']
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
      const novo = await relatorios.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  },

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