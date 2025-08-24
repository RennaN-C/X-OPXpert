const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ordens_servico', {
    id_os: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_manutencao: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'manutencoes',
        key: 'id_manutencao'
      }
    },
    responsavel: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    custo: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    observacao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ordens_servico',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ordens_servico_pkey",
        unique: true,
        fields: [
          { name: "id_os" },
        ]
      },
    ]
  });
};
