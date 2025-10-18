// models/fornecedores.js
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const fornecedores = sequelize.define('fornecedores', {
    id_fornecedor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    // ... outros campos ...
    cnpj: {
      type: DataTypes.STRING(18),
      allowNull: true,
      unique: "fornecedores_cnpj_key"
    },
    contato: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'fornecedores',
    schema: 'public',
    timestamps: true
  });

  // ADICIONAR ESTA PARTE
  fornecedores.associate = function(models) {
    fornecedores.hasMany(models.pedidos_compra, {
      foreignKey: 'id_fornecedor',
      as: 'pedidos' // um fornecedor tem muitos 'pedidos'
    });
  };

  return fornecedores;
};