require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,    // "X OPXpert"
  process.env.DB_USER,    // ex: "postgres"
  process.env.DB_PASS,    // sua senha
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5430,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false,     // não exigir createdAt/updatedAt no banco já existente
      freezeTableName: true  // não pluralizar nomes automaticamente
    }
    // Se seu provedor exigir SSL:
    // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  }
);

module.exports = sequelize;
