const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('qualidade', {
    id_inspecao: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_ordem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ordens_producao',
        key: 'id_ordem'
      }
    },
    responsavel: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    data_inspecao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    resultado: {
      type: DataTypes.STRING(20), 
      allowNull: false
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'qualidade',
    schema: 'public',
    timestamps: true
  });
};