const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('funcionarios', {
    id_funcionario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome_completo: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    cpf: {
      type: DataTypes.CHAR(11),
      allowNull: false,
      unique: "funcionarios_cpf_key"
    },
    cargo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    departamento_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'departamentos',
        key: 'id_departamento'
      }
    },
    data_admissao: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    salario: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'funcionarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "funcionarios_cpf_key",
        unique: true,
        fields: [
          { name: "cpf" },
        ]
      },
      {
        name: "funcionarios_pkey",
        unique: true,
        fields: [
          { name: "id_funcionario" },
        ]
      },
    ]
  });
};
