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
    workOrderDate: DataTypes.DATE,
    customerId: DataTypes.INTEGER,
    jobDescription: DataTypes.STRING,
    partsId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
    technician: DataTypes.INTEGER,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    name: DataTypes.STRING,
    signature: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};