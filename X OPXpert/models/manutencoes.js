const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('manutencoes', {
    id_manutencao: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    equipamento: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tipo: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data_agendada: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    data_realizada: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Agendada"
    }
  }, {
    sequelize,
    tableName: 'manutencoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "manutencoes_pkey",
        unique: true,
        fields: [
          { name: "id_manutencao" },
        ]
      },
    ]
  });
};
