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
    await Part.bulkCreate([
      {
        name: "24-port Switch",
        sku: "24PSWTCH",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        unitPrice: 48.50,
        ticketId: 1,
        quantity: 5,
      },
      {
        name: "NetGate Firewall",
        sku: "NTGTFRW",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        unitPrice: 348.50,
        quantity: 3,
        ticketId: 1
      },
      {
        name: "Riser UTP Cable",
        sku: "ADIRC",
        description: "ADI PRO Cat 6 Riser Cable is UL certified and features 23 AWG with 4 solid bare annealed copper conductor-pairs. Our wire is fully tested to exceed industry standards to satisfy the need for present and future networks in the market. Also available in other colors.",
        unitPrice: 35.50,
        ticketId: 2,
        quantity: 1
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Parts";
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ["NetGate Firewall", "24-port Switch"]
      }
    }, {});
  }
};
