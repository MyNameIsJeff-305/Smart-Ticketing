'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {

    static associate(models) {
      Customer.hasMany(
        models.Ticket,
        { foreignKey: 'customerId', onDelete: 'CASCADE' }
      ),
        Customer.hasMany(
          models.Location,
          { foreignKey: 'customerId', onDelete: 'CASCADE' }
        )
    }
  }
  Customer.init({
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    companyName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    }
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};