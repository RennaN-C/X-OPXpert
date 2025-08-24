const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etapas_producao', {
    id_etapa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_ordem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ordens_producao',
        key: 'id_ordem'
      }
    },
    nome_etapa: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tempo_estimado: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tempo_real: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Pendente"
    }
  }, {
    sequelize,
    tableName: 'etapas_producao',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "etapas_producao_pkey",
        unique: true,
        fields: [
          { name: "id_etapa" },
        ]
      },
    ]
  });
};
