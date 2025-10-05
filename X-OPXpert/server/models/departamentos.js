const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departamentos', {
    id_departamento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "departamentos_nome_key"
    }
  }, {
    sequelize,
    tableName: 'departamentos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "departamentos_nome_key",
        unique: true,
        fields: [
          { name: "nome" },
        ]
      },
      {
        name: "departamentos_pkey",
        unique: true,
        fields: [
          { name: "id_departamento" },
        ]
      },
    ]
  });
};
