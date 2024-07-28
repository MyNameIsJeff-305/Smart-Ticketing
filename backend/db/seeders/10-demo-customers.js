'use strict';
const { Customer } = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Customers'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Customer.bulkCreate([
      {
        type: "Company",
        companyName: "Company1",
        phoneNumber: 1234567890,
        email: "company@company.io",
      },
      {
        type: "Individual",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: 2345678901,
        email: "ind@ind.io",
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Customers";
    return queryInterface.bulkDelete(options, {
      type: {
        [Op.in]: ["Company", "Individual"]
      }
    }, {});
  }
};
