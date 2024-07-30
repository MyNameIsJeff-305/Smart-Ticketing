'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Parts';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Parts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      sku: {
        allowNull: false,
        type: Sequelize.STRING,
        // unique: true
      },
      description: {
        type: Sequelize.STRING(500)
      },
      unitPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      // ticketId: {
      //   type: Sequelize.INTEGER
      // },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    options.tableName = "Parts"
    await queryInterface.dropTable(options);
  }
};