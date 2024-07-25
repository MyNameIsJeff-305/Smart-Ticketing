'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    workOrderDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER
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