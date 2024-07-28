'use strict';
const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
options.tableName = 'Users'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        firstName: "Admin",
        lastName: "SMART",
        email: "admin@user.io",
        username: "Admin",
        hashedPassword: bcrypt.hashSync('password'),
        roleId: 1
      },
      {
        firstName: "El Flaco",
        lastName: "Carlos Manuel",
        email: 'demo@user.io',
        username: 'ElFlaco',
        hashedPassword: bcrypt.hashSync('password'),
        roleId: 2
      },
      {
        firstName: "Flautin",
        lastName: "Hernandez",
        email: 'user1@user.io',
        username: 'Flautin',
        hashedPassword: bcrypt.hashSync('password2'),
        roleId: 3
      },
      {
        firstName: "Alex",
        lastName: "Hernandez",
        email: 'user2@user.io',
        username: 'Alex',
        hashedPassword: bcrypt.hashSync('password3'),
        roleId: 1
      }
    ], options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};

