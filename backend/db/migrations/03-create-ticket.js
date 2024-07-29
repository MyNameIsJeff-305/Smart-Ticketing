'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Tickets';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      workOrderDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      locationId: {
          allowNull: false,
          type: Sequelize.INTEGER
      },
      jobDescription: {
        type: Sequelize.STRING(500)
      },
      technician: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      checkIn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      checkOut: {
        allowNull: false,
        type: Sequelize.DATE
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      signature: {
        type: Sequelize.STRING
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
    options.tableName = "Tickets"
    await queryInterface.dropTable(options);
  }
};