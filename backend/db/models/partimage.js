'use strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PartImage extends Model {

    static associate(models) {
      PartImage.belongsTo(
        models.Part,
        { foreignKey: 'partId', onDelete: 'CASCADE' }
      )
    }
  }
  PartImage.init({
    url: {
      allowNull: false,
      type: DataTypes.CHAR,
      unique: true,
      validate: {
        isUrl: true,
        len: [12, 200] //12 is the less possible amount of characters that a URL may have
      }
    },
    partId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Parts',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'PartImage',
  });
  return PartImage;
};