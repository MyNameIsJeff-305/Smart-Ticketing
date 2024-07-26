'use strict';

const { Role } = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Roles'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Role.bulkCreate([
      {
        name: 'Admin',
        description: 'Admin of all Roles and permissions'
      },
      {
        name: 'Technician',
        description: 'Perform on-site installations and troubleshooting.'
      },
      {
        name: 'Desk Support',
        description: 'Perform on-site installations and troubleshooting.'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Roles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ['Admin', 'Technician', 'Desk Support']
      }
    }, {});
  }
};
