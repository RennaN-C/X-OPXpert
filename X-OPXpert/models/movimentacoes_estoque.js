const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movimentacoes_estoque', {
    id_mov: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'produtos',
        key: 'id_produto'
      }
    },
    tipo: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    quantidade: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    data_movimento: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    observacao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'movimentacoes_estoque',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "movimentacoes_estoque_pkey",
        unique: true,
        fields: [
          { name: "id_mov" },
        ]
      },
    ]
  });
};
