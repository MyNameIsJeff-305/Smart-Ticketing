'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Part extends Model {

    static associate(models) {
      Part.belongsTo(
        models.Ticket,
        { foreignKey: 'ticketId', onDelete: 'CASCADE' }
      ),
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
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1
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