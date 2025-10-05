const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ponto', {
    id_ponto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_funcionario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'funcionarios',
        key: 'id_funcionario'
      }
    },
    data_registro: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hora_entrada: {
      type: DataTypes.TIME,
      allowNull: true
    },
    hora_saida: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ponto',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ponto_pkey",
        unique: true,
        fields: [
          { name: "id_ponto" },
        ]
      },
    ]
  });
};
