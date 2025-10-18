const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "clientes",
    {
      id_cliente: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nome_razao_social: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      cpf_cnpj: {
        type: DataTypes.STRING(18),
        allowNull: true,
        unique: "clientes_cpf_cnpj_key",
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      telefone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      endereco: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "clientes",
      schema: "public",
      timestamps: true,
    }
  );
};
