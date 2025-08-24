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
    // Busca usuário pelo campo 'usuario' no banco
    const user = await Usuarios.findOne({ where: { usuario } });

    if (!user) {
      return res.status(401).json({ mensagem: "Usuário não encontrado." });
    }

    // Compara a senha recebida com o hash armazenado
    const senhaValida = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Senha incorreta." });
    }

    // Autenticação OK — aqui você pode gerar token JWT ou criar sessão, se quiser

    return res.json({ mensagem: "Login realizado com sucesso!" });
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};
