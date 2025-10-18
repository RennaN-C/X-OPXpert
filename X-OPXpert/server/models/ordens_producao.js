// models/ordens_producao.js
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const ordens_producao = sequelize.define('ordens_producao', {
    id_ordem: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigo_ordem: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: "ordens_producao_codigo_ordem_key"
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    data_prevista: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    data_conclusao: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "Aberta"
    },
    quantidade_planejada: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantidade_produzida: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    perdas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
    tableName: 'ordens_producao',
    schema: 'public',
    timestamps: false
  });

  // ADICIONE ESTA PARTE PARA DEFINIR A RELAÇÃO
  ordens_producao.associate = function(models) {
    ordens_producao.belongsTo(models.usuarios, {
      foreignKey: 'criado_por',
      as: 'criador'
    });
  };

  return ordens_producao;
};