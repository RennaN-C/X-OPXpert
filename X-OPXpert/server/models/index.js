// models/index.js - Versão Corrigida e Centralizada
'use strict';

const Sequelize = require('sequelize');
const initModels = require('./init-models'); // Importa o inicializador
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5430,
    dialect: 'postgres',
    logging: false, // Desativa os logs de SQL no console
  }
);

// Usa o initModels para carregar tudo
const db = initModels(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;