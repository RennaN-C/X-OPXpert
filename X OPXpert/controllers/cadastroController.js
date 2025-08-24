// controllers/cadastroController.js

const bcrypt = require("bcryptjs");
const db = require("../models");
const Usuarios = db.usuarios;
const { Op } = db.Sequelize;

exports.cadastrar = async (req, res) => {
  const {
    nome_completo,
    email,
    usuario,
    cpf,
    telefone,
    departamento_id,
    cargo,
    matricula,
    data_admissao,
    gerente_responsavel,
    senha,
  } = req.body;

  // Validação básica
  if (!nome_completo || !email || !usuario || !cpf || !senha) {
    return res.status(400).json({ mensagem: "Campos obrigatórios faltando." });
  }

  try {
    // Verificar se já existe usuário, email, cpf ou matrícula iguais
    const existente = await Usuarios.findOne({
      where: {
        [Op.or]: [{ usuario }, { email }, { cpf }, { matricula }],
      },
    });

    if (existente) {
      return res
        .status(409)
        .json({ mensagem: "Usuário, email, CPF ou matrícula já cadastrado." });
    }

    // Criptografar senha
    const senha_hash = await bcrypt.hash(senha, 10);

    // Criar novo usuário
    const novoUsuario = await Usuarios.create({
      nome_completo,
      email,
      usuario,
      cpf,
      telefone,
      departamento_id,
      cargo,
      matricula,
      data_admissao,
      gerente_responsavel,
      senha_hash,
      ativo: true,
    });

    return res.status(201).json({
      mensagem: "Usuário cadastrado com sucesso!",
      usuario: novoUsuario.usuario,
    });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
