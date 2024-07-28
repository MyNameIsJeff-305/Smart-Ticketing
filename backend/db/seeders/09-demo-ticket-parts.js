'use strict';
const { TicketPart } = require('../models')

let options = {};
options.tableName = 'TicketParts'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await TicketPart.bulkCreate([
      {
        ticketId: 1,
        partId: 1
      },
      {
        ticketId: 2,
        partId: 1
      },
      {
        ticketId: 1,
        partId: 2
      },
      {
        ticketId: 2,
        partId: 2
      },
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "TicketParts";
    return queryInterface.bulkDelete(options, {
      ticketId: {
        [Op.in]: [1, 2]
      }
    }, {});
  }
};
