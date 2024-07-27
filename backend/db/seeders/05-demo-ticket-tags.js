'use strict';

/** @type {import('sequelize-cli').Migration} */

const { TicketTag } = require('../models')

let options = {};
options.tableName = 'TicketTags'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    TicketTag.bulkCreate([
      {
        tagId: 1,
        ticketId: 1
      },
      {
        tagId: 1,
        ticketId: 2
      },
      {
        tagId: 2,
        ticketId: 1
      },
      {
        tagId: 3,
        ticketId: 3
      },
      {
        tagId: 1,
        ticketId: 3
      },
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'TicketTags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      tagId: {
        [Op.in]: [1, 1, 2, 3, 1]
      }
    }, {});
  }
};
