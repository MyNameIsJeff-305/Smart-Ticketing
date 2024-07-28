'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketTag extends Model {
    static associate(models) {
    }
  }
  TicketTag.init({
    ticketId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tickets',
        key: 'id',
      },
    },
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tags',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'TicketTag',
  });
  return TicketTag;
};