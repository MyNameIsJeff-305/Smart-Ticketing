'use strict';
const { Ticket } = require('../models');

let options = {};
options.tableName = 'Tickets'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Ticket.bulkCreate([
      {
        workOrderDate: new Date(2024, 2, 1),
        customerId: 1,
        jobDescription: "Install, configure, and upgrade software applications on client systems. Provide support for software-related issues and ensure compatibility with existing systems.",
        technician: 2,
        checkIn: new Date(2024, 1, 10),
        checkOut: new Date(2024, 1, 11),
        name: "Installation in Dental Design",
      },
      {
        workOrderDate: new Date(2024, 3, 2),
        customerId: 2,
        jobDescription: "Diagnose and resolve network connectivity issues for clients. Perform regular network maintenance and upgrades.",
        technician: 3,
        checkIn: new Date(2024, 1, 13),
        checkOut: new Date(2024, 1, 11),
        name: "TroubleShooting of Network in AA Glass",
      },
      {
        workOrderDate: new Date(2024, 2, 5),
        customerId: 1,
        jobDescription: "Provide repair and maintenance services for computer hardware. Manage hardware inventory and order new parts as needed.",
        technician: 2,
        checkIn: new Date(2024, 1, 13),
        checkOut: new Date(2024, 1, 11),
        name: "Stations Repair in Dental Design",
      },
      {
        workOrderDate: new Date(2024, 2, 15),
        customerId: 2,
        jobDescription: "Offer technical support to clients via phone, email, or in-person. Resolve IT issues efficiently and maintain high customer satisfaction.",
        technician: 3,
        checkIn: new Date(2024, 2, 13),
        checkOut: new Date(2024, 2, 11),
        name: "Technical Support in AA Glass",
      },
      {
        workOrderDate: new Date(2024, 4, 5),
        customerId: 4,
        jobDescription: "Protect client systems and data from cyber threats. Conduct security assessments and implement security measures.",
        technician: 2,
        checkIn: new Date(2024, 5, 20),
        checkOut: new Date(2024, 5, 11),
        name: "Assessment on South Beach Dentistry",
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Tickets';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ["Installation in Dental Design", "TroubleShooting of Network in AA Glass",
          "Stations Repair in Dental Design", "Technical Support in AA Glass", "Assessment on South Beach Dentistry"]
      }
    }, {});
  }
};
