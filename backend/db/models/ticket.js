'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {

    static associate(models) {
      Ticket.belongsTo(
        models.User,
        { foreignKey: 'technician', onDelete: 'CASCADE' }
      ),
        Ticket.hasMany(
          models.Tag,
          { foreignKey: 'ticketId', onDelete: 'CASCADE' }
        ),
        Ticket.hasMany(
          models.Part,
          { foreignKey: "ticketId", onDelete: 'CASCADE' }
        ),
        Ticket.belongsTo(
          models.Customer,
          { foreignKey: 'customerId', onDelete: 'CASCADE' }
        )
    }
  }
  Ticket.init({
    workOrderDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Customers',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    jobDescription: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 500]
      }
    },
    technician: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
    checkIn: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    checkOut: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    signature: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};