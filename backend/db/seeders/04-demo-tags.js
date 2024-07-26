'use strict';

const { Tag } = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Tags'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Tag.bulkCreate([
      {
        name: "Installation",
        description: "All general Installation Tickets",
        color: '#09F4A6'
      },
      {
        name: "Assessment",
        description: "All general Assessment Tickets",
        color: '#F0F4A6'
      },
      {
        name: "TroubleShooting",
        description: "All general TroubleShooting Tickets",
        color: '#F409A6'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ["Installation", "Assessment", "TroubleShooting"]
      }
    }, {});
  }
};
