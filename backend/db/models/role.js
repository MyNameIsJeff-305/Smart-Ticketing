'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {
      Role.hasMany(
        models.User,
        { foreignKey: 'roleId', onDelete: 'CASCADE' }
      )
    }
  }
  Role.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};