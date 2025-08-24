const { funcionarios } = require("../models");
const { Sequelize } = require("sequelize");

module.exports = {
  async criar(req, res) {
    const { nome_completo, cpf } = req.body;

    if (!nome_completo || !cpf) {
      return res
        .status(400)
        .json({ erro: "Os campos 'nome_completo' e 'cpf' são obrigatórios." });
    }

    try {
      // Cria novo funcionário
      const novo = await funcionarios.create(req.body);
      return res.status(201).json(novo);
    } catch (err) {
      // Erro de chave duplicada (CPF único)
      if (err instanceof Sequelize.UniqueConstraintError) {
        return res.status(409).json({ erro: "CPF já cadastrado." });
      }
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }
  },

  async listar(req, res) {
    try {
      const todos = await funcionarios.findAll();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao listar funcionários." });
    }
  },

  async obter(req, res) {
    try {
      const item = await funcionarios.findByPk(req.params.id);
      if (!item)
        return res.status(404).json({ erro: "Funcionário não encontrado." });
      res.json(item);
    } catch (err) {
      res.status(500).json({ erro: "Erro ao buscar funcionário." });
    }
  },

  async atualizar(req, res) {
    const { nome_completo, cpf } = req.body;

    // Se quiser, pode validar aqui também
    if (nome_completo === "" || cpf === "") {
      return res
        .status(400)
        .json({ erro: "nome_completo e cpf não podem ser vazios." });
    }

    try {
      const item = await funcionarios.findByPk(req.params.id);
      if (!item)
        return res.status(404).json({ erro: "Funcionário não encontrado." });

      await item.update(req.body);
      res.json(item);
    } catch (err) {
      if (err instanceof Sequelize.UniqueConstraintError) {
        return res.status(409).json({ erro: "CPF já cadastrado." });
      }
      res.status(500).json({ erro: "Erro ao atualizar funcionário." });
    }
  },

  async deletar(req, res) {
    try {
      const item = await funcionarios.findByPk(req.params.id);
      if (!item)
        return res.status(404).json({ erro: "Funcionário não encontrado." });

      await item.destroy();
      res.json({ mensagem: "Funcionário deletado com sucesso." });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar funcionário." });
    }
  },
};
