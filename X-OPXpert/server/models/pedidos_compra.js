const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const pedidos_compra = sequelize.define('pedidos_compra', {
    id_pedido: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_fornecedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'fornecedores',
        key: 'id_fornecedor'
      }
    },
    
    data_pedido: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    valor_total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "Pendente"
    }
  }, {
    sequelize,
    tableName: 'pedidos_compra',
    schema: 'public',
    timestamps: true
  });

  
  pedidos_compra.associate = function(models) {
    pedidos_compra.belongsTo(models.fornecedores, {
      foreignKey: 'id_fornecedor',
      as: 'fornecedor' 
    });
  };

  return pedidos_compra;
};