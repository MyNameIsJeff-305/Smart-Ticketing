'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      type: DataTypes.INTEGER
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