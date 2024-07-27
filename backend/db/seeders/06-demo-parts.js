'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Part } = require('../models');

let options = {};
options.tableName = 'Parts'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    Part.bulkCreate([
      {
        name: "24-port Switch",
        sku: "24PSWTCH",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        unitPrice: 48.50,
        quantity: 2,
        ticketId: 1
      },
      {
        name: "NetGate Firewall",
        sku: "NTGTFRW",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        unitPrice: 348.50,
        quantity: 1,
        ticketId: 1
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
