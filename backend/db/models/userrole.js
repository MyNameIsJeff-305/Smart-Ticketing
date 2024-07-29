'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {

    static associate(models) {
    }
  }
  UserRole.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles',
        key: 'id'
      },
    }
  }, {
    sequelize,
    modelName: 'UserRole',
  });
  return UserRole;
};