'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketPart extends Model {

    static associate(models) {
      // define association here
    }
  }
  TicketPart.init({
    partId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Parts',
        key: 'id'
      }
    },
    ticketId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Tickets',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'TicketPart',
  });
  return TicketPart;
};