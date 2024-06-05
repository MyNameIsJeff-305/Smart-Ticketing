'use strict';
const { User } = require('../models');
const bcryptjs = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: "User",
        lastName: "One",
        email: 'user1@user.io',
        username: 'User1',
        hashedPassword: bcryptjs.hashSync("password")
      },
      {
        firstName: "User",
        lastName: "Two",
        email: 'user2@user.io',
        username: 'User2',
        hashedPassword: bcryptjs.hashSync("password")
      },
      {
        firstName: "User",
        lastName: "Three",
        email: 'user3@user.io',
        username: 'User3',
        hashedPassword: bcryptjs.hashSync("password")
      }
    ], { validate: true })
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: ['User1', 'User2', 'User3']
      }
    }, {});
  }
};
