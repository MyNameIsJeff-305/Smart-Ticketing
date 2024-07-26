'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserImage extends Model {

    static associate(models) {
      UserImage.hasOne(
        models.User,
        { foreignKey: 'employeeId', nonDelete: 'CASCADE' }
      )
    }
  }
  UserImage.init({
    url: {
      allowNull: false,
      type: DataTypes.STRING
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'UserImage',
  });
  return UserImage;
};