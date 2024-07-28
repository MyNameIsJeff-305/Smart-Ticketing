'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {

    static associate(models) {
      Tag.belongsToMany(
        models.Ticket, {
        through: 'TicketTags',
        foreignKey: 'tagId',
        otherKey: 'ticketId',
      })
    }
  }
  Tag.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    description: {
      defaultValue: "",
      type: DataTypes.STRING,
      validate: {
        len: [0, 500]
      }
    },
    color: {
      allowNull:false,
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};