'use strict';

const { Location } = require('../models');

let options = {};
options.tableName = 'Locations'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Location.bulkCreate([
      {
        name: "Doral Office",
        customerId: 1,
        addressLine1: "1234 NW 123rd ave",
        city: "Miami",
        state: "FL",
        zipCode: "33182",
        customerId: 1
      },
      {
        name: "Cape Coral Office",
        customerId: 1,
        addressLine1: "3350 Veterans Ave",
        city: "Cape Coral",
        state: "FL",
        zipCode: "33033",
        customerId: 1
      },
      {
        name: "Jonh Doe's Home",
        customerId: 2,
        addressLine1: "123 Disney Lane",
        city: "Miami",
        state: "FL",
        zipCode: "33175",
        customerId: 2
      },
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Locations";
    return queryInterface.bulkDelete(options, {}, {});
  }
};
