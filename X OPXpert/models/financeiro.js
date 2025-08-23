const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('financeiro', {
    id_lancamento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipo: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valor: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    data_lancamento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "Pendente"
    }
  }, {
    sequelize,
    tableName: 'financeiro',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "financeiro_pkey",
        unique: true,
        fields: [
          { name: "id_lancamento" },
        ]
      },
    ]
  });
};
