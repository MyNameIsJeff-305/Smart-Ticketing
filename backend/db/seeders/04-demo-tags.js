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
        name: "Installation"
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tags';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: []
      }
    }, {});
  }
};
