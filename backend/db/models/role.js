'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {
      Role.belongsTo(
        models.User,
        { foreignKey: 'roleId', onDelete: 'CASCADE' }
      )
    }
  }
  Role.init({
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
      // validate: {
      //   len: [0, 50]
      // }
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Role',
  });

  return Role;
};