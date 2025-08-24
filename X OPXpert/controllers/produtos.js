const { produtos } = require('../models');
const { Sequelize } = require('sequelize');

module.exports = {
  async criar(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "O campo 'nome' é obrigatório." });
    }

    try {
      const novoProduto = await produtos.create(req.body);
      return res.status(201).json(novoProduto);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao criar produto.", detalhes: err.message });
    }
  },

  async listar(req, res) {
    try {
      const lista = await produtos.findAll();
      return res.json(lista);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao listar produtos." });
    }
  },

  async obter(req, res) {
    try {
      const produto = await produtos.findByPk(req.params.id);
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado." });
      }
      return res.json(produto);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao buscar produto." });
    }
  },

  async atualizar(req, res) {
    try {
      const produto = await produtos.findByPk(req.params.id);
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado." });
      }

      await produto.update(req.body);
      return res.json(produto);
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao atualizar produto.", detalhes: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const produto = await produtos.findByPk(req.params.id);
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado." });
      }

      await produto.destroy();
      return res.json({ mensagem: "Produto deletado com sucesso." });
    } catch (err) {
      return res.status(500).json({ erro: "Erro ao deletar produto." });
    }
  }
};
