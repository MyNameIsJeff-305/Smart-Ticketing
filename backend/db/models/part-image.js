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
      type: DataTypes.STRING,
      validate: {
        isUrl: true
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