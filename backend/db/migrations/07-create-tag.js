'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'Tags';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tags', {
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
      description: {
        type: Sequelize.STRING
      },
      ticketId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      color: {
        allowNull: false,
        defaultValue: '#f7f7f7',
        type: Sequelize.STRING(7)
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
    options.tableName = "Tags"
    await queryInterface.dropTable(options);
  }
};