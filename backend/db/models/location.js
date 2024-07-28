'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {

    static associate(models) {
      Location.belongsTo(
        models.Customer,
        { foreignKey: 'customerId', onDelete: 'CASCADE' }
      )
    }
  }
  Location.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
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
    addressLine1: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 100]
      }
    },
    addressLine2: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 100]
      }
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      }
    },
    zipCode: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 5]
      }
    }
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};