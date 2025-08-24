const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario_permissoes', {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    id_permissao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'permissoes',
        key: 'id_permissao'
      }
    }
  }, {
    sequelize,
    tableName: 'usuario_permissoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuario_permissoes_pkey",
        unique: true,
        fields: [
          { name: "id_usuario" },
          { name: "id_permissao" },
        ]
      },
    ]
  });
};
