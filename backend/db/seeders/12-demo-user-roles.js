'use strict';

/** @type {import('sequelize-cli').Migration} */

const { UserRole } = require('../models');

let options = {};
options.tableName = 'UserRoles';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Location.bulkCreate([
      {
        roleId: 1,
        userId: 1
      },
      {
        roleId: 2,
        userId: 2
      },
      {
        roleId: 3,
        userId: 3
      },
      {
        roleId: 1,
        userId: 3
      },
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'UserRoles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
