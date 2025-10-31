// server/controllers/ordens_producao.js - VERSÃO COM CÓDIGO AUTOMÁTICO E CORREÇÃO
const { ordens_producao, usuarios, clientes } = require('../models');
const { Op } = require('sequelize');

module.exports = {
  async criar(req, res) {
    try {
      // --- LÓGICA DE GERAÇÃO DE CÓDIGO ---
      const ano = new Date().getFullYear();
      const prefixo = `OP-${ano}-`;

      const ultimaOrdem = await ordens_producao.findOne({
        where: {
          codigo_ordem: {
            [Op.like]: `${prefixo}%` 
          }
        },
        order: [['codigo_ordem', 'DESC']]
      });

      let novoNumero = 1;
      if (ultimaOrdem) {
        const numeroStr = ultimaOrdem.codigo_ordem.split('-').pop();
        novoNumero = parseInt(numeroStr, 10) + 1;
      }

      const novoCodigo = prefixo + novoNumero.toString().padStart(4, '0');
      // --- FIM DA LÓGICA ---


      // --- *** A CORREÇÃO ESTÁ AQUI *** ---
      
      // 1. Prepara os dados para criação
      const dadosParaCriar = {
        ...req.body, // Pega todos os campos do frontend
        codigo_ordem: novoCodigo, // Define o código gerado
        
        // 2. CONVERTE STRING VAZIA EM NULL:
        // Se req.body.id_cliente for "" (ou qualquer valor 'falsy' como 0), 
        // define-o como 'null', que é o valor correto para o banco de dados.
        id_cliente: req.body.id_cliente || null
      };

      // 3. Cria a ordem com os dados JÁ TRATADOS
      const novo = await ordens_producao.create(dadosParaCriar);
      
      res.status(201).json(novo);

    } catch (err) {
      // Adiciona um log no console do servidor para debugging
      console.error("Erro detalhado ao criar ordem de produção:", err); 

      if (err.name === 'SequelizeUniqueConstraintError') {
         return res.status(409).json({ erro: 'Falha ao gerar código de ordem. Tente novamente.' });
      }
      
      // Retorna a mensagem de erro específica, se houver
      res.status(400).json({ erro: err.message || "Erro desconhecido no servidor." });
    }
  },

  async listar(req, res) {
    try {
      const todos = await ordens_producao.findAll({
        include: [{ 
            model: usuarios,
            as: 'criador',
            attributes: ['nome_completo']
        },
        { 
            model: clientes,
            as: 'cliente',
            attributes: ['nome_razao_social']
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
      const item = await ordens_producao.findByPk(req.params.id, {
         include: [
            { model: usuarios, as: 'criador', attributes: ['nome_completo'] },
            { model: clientes, as: 'cliente', attributes: ['nome_razao_social'] }
         ]
      });
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
      
      // Remove o codigo_ordem do body para evitar que seja alterado
      delete req.body.codigo_ordem; 
      
      // Trata o id_cliente caso venha vazio na atualização
      if (req.body.id_cliente === "") {
        req.body.id_cliente = null;
      }

      await item.update(req.body);
      res.json(item);
    } catch (err) {
      console.error("Erro ao atualizar ordem:", err);
      res.status(400).json({ erro: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const item = await ordens_producao.findByPk(req.params.id);
      if (!item) return res.status(404).json({ erro: 'Ordem de produção não encontrada' });
      await item.destroy();
      res.json({ mensagem: 'Ordem de produção deletada com sucesso.' });
    } catch (err) {
      console.error("Erro ao deletar ordem:", err);
      res.status(400).json({ erro: err.message });
    }
  }
};