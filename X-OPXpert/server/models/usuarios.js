const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome_completo: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "usuarios_email_key"
    },
    usuario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "usuarios_usuario_key"
    },
    cpf: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      unique: "usuarios_cpf_key"
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    departamento_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departamentos',
        key: 'id_departamento'
      }
    },
    cargo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    matricula: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "usuarios_matricula_key"
    },
    data_admissao: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gerente_responsavel: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    senha_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'public',
    timestamps: false
  });
};