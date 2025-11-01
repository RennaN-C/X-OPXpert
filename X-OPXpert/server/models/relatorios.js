const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const relatorios = sequelize.define('relatorios', {
    id_relatorio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    criado_por: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    }
  }, {
    sequelize,
    tableName: 'relatorios',
    schema: 'public',
    timestamps: false
  });

 
  relatorios.associate = function(models) {
    relatorios.belongsTo(models.usuarios, {
      foreignKey: 'criado_por',
      as: 'criador'
    });
  };

  return relatorios;
};