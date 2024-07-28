'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Part extends Model {

    static associate(models) {
      Part.belongsToMany(
        models.Ticket, {
          through: 'TicketParts',
          foreignKey: 'partId',
          otherKey: 'ticketId'
        }),
        Part.hasOne(
          models.PartImage,
          { foreignKey: 'partId', onDelete: 'CASCADE' }
        )
    }
  }
  Part.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    sku: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 500]
      }
    },
    unitPrice: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    ticketId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tickets',
        key: 'id'
      }
    },
    onDelete: 'CASCADE'
  }, {
    sequelize,
    modelName: 'Part',
  });
  return Part;
};