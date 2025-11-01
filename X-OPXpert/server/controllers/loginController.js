const bcrypt = require("bcryptjs");
const db = require("../models");
const Usuarios = db.usuarios;

exports.login = async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Usuário e senha são obrigatórios." });
  }

  try {
    
    const user = await Usuarios.findOne({ where: { usuario } });

    if (!user) {
      return res.status(401).json({ mensagem: "Usuário não encontrado." });
    }
  
    const senhaValida = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    const usuarioParaSessao = {
      id_usuario: user.id_usuario,
      nome_completo: user.nome_completo,
      email: user.email,
      usuario: user.usuario,
      cpf: user.cpf,
      telefone: user.telefone,
      departamento_id: user.departamento_id,
      cargo: user.cargo,
      matricula: user.matricula,
      data_admissao: user.data_admissao,
      gerente_responsavel: user.gerente_responsavel,
      ativo: user.ativo
    };

    req.session.usuarioLogado = usuarioParaSessao;
    
    return res.json({ 
      mensagem: "Login realizado com sucesso!",
      usuario: usuarioParaSessao 
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};