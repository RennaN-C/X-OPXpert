const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('produtos', {
    id_produto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    unidade_medida: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    quantidade_atual: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    quantidade_minima: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'produtos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "produtos_pkey",
        unique: true,
        fields: [
          { name: "id_produto" },
        ]
      },
    ]
  });
};
