'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Locations';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Locations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      addressLine1: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      addressLine2: {
        type: Sequelize.TEXT
      },
      city: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      state: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Locations';
    await queryInterface.dropTable(options);
  }
};