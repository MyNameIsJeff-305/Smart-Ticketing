'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {

    static associate(models) {
      Tag.belongsToMany(
        models.Ticket,
        { foreignKey: "ticketId", onDelete: 'CASCADE' }
      )
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
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};