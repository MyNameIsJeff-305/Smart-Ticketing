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
      type: DataTypes.STRING,
      validate: {
        len: [0, 500]
      }
    },
    ticketId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Tickets',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    color: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 7]
      }
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};