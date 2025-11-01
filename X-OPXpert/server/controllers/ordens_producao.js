const { ordens_producao, usuarios, clientes } = require('../models');
const { Op } = require('sequelize');


async function apontar(req, res) {
  try {
    const { id } = req.params;
    const { quantidade_apontada } = req.body;

    if (!quantidade_apontada || isNaN(quantidade_apontada) || quantidade_apontada <= 0) {
      return res.status(400).json({ erro: 'Quantidade apontada inválida.' });
    }

    const ordem = await ordens_producao.findByPk(id);
    if (!ordem) {
      return res.status(404).json({ erro: 'Ordem de produção não encontrada.' });
    }

    if (ordem.status === 'Concluída' || ordem.status === 'Cancelada') {
      return res.status(400).json({ erro: 'Esta ordem já está finalizada e não pode receber apontamentos.' });
    }

    
    const nova_produzida = (ordem.quantidade_produzida || 0) + parseInt(quantidade_apontada, 10);
    const planejada = ordem.quantidade_planejada || 0;
    
    let novo_progresso = 0;
    let novo_status = 'Em Execução'; 

    if (planejada > 0) {
      novo_progresso = Math.round((nova_produzida / planejada) * 100);
    }

   
    if (nova_produzida >= planejada) {
      novo_status = 'Concluída';
      novo_progresso = 100;
    }
    
    
    await ordem.update({
      quantidade_produzida: nova_produzida,
      progresso: novo_progresso,
      status: novo_status
    });

    return res.json(ordem); // Retorna a ordem atualizada

  } catch (err) {
    console.error("Erro no apontamento:", err);
    res.status(500).json({ erro: 'Erro interno no servidor ao fazer apontamento.' });
  }
}
// --- FIM DA NOVA FUNÇÃO ---


module.exports = {
  // Exporta a nova função
  apontar,

  async criar(req, res) {
    try {
      const ano = new Date().getFullYear();
      const prefixo = `OP-${ano}-`;
      const ultimaOrdem = await ordens_producao.findOne({
        where: { codigo_ordem: { [Op.like]: `${prefixo}%` } },
        order: [['codigo_ordem', 'DESC']]
      });
      let novoNumero = 1;
      if (ultimaOrdem) {
        novoNumero = parseInt(ultimaOrdem.codigo_ordem.split('-').pop(), 10) + 1;
      }
      const novoCodigo = prefixo + novoNumero.toString().padStart(4, '0');

      const dadosParaCriar = {
        ...req.body,
        codigo_ordem: novoCodigo,
        id_cliente: req.body.id_cliente || null,
        id_responsavel: req.body.id_responsavel || null,
        progresso: 0, // Garante que o progresso comece em 0
        status: 'Aberta' // Garante que o status inicial seja "Aberta"
      };

      const novo = await ordens_producao.create(dadosParaCriar);
      res.status(201).json(novo);

    } catch (err) {
      console.error("Erro detalhado ao criar ordem de produção:", err); 
      if (err.name === 'SequelizeUniqueConstraintError') {
         return res.status(409).json({ erro: 'Falha ao gerar código de ordem. Tente novamente.' });
      }
      res.status(400).json({ erro: err.message || "Erro desconhecido no servidor." });
    }
  },

  async listar(req, res) {
    try {
      const todos = await ordens_producao.findAll({
        include: [
          { model: usuarios, as: 'criador', attributes: ['nome_completo'] },
          { model: clientes, as: 'cliente', attributes: ['nome_razao_social'] },
          { model: usuarios, as: 'responsavel', attributes: ['nome_completo'] }
        ],
        order: [['data_inicio', 'DESC']] // Ordena por mais recente
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
            { model: clientes, as: 'cliente', attributes: ['nome_razao_social'] },
            { model: usuarios, as: 'responsavel', attributes: ['nome_completo'] }
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
      
      delete req.body.codigo_ordem; 
      
      // Não deixa o usuário editar esses campos manualmente
      delete req.body.quantidade_produzida;
      delete req.body.progresso;
      // O status (Cancelada) pode ser editado
      
      if (req.body.id_cliente === "") req.body.id_cliente = null;
      if (req.body.id_responsavel === "") req.body.id_responsavel = null;

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