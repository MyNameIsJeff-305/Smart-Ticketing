'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserImage extends Model {

    static associate(models) {
      UserImage.belongsTo(
        models.User,
        { foreignKey: 'userId', onDelete: 'CASCADE' }
      )
    }
  }
  UserImage.init({
    url: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "img/placeholder-profile.png",
      validate: {
        isUrl: true,
        len: [12, 200] //12 is the less possible amount of characters that a URL may have
      }
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