const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permissoes', {
    id_permissao: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "permissoes_nome_key"
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'permissoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "permissoes_nome_key",
        unique: true,
        fields: [
          { name: "nome" },
        ]
      },
      {
        name: "permissoes_pkey",
        unique: true,
        fields: [
          { name: "id_permissao" },
        ]
      },
    ]
  });
};
