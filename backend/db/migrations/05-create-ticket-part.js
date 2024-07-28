'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = 'TicketParts';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TicketParts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      partId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Parts",
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      ticketId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tickets',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    options.tableName = 'TicketParts';
    await queryInterface.dropTable(options);
  }
};