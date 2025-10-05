const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('agenda', {
    id_evento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data_evento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    hora_evento: {
      type: DataTypes.TIME,
      allowNull: true
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
    tableName: 'agenda',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "agenda_pkey",
        unique: true,
        fields: [
          { name: "id_evento" },
        ]
      },
    ]
  });
};
