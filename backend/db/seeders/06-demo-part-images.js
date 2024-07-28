'use strict';

const { PartImage } = require('../models');

let options = {};
options.tableName = 'PartImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await PartImage.bulkCreate([
      {
        url: "https://www.nicgiga.com/cdn/shop/files/1_0e989996-c697-47c5-9158-6ce43e2d8db0.jpg",
        partId: 1
      },
      {
        url: "https://shop.netgate.com/cdn/shop/files/sg-1100_fronttopangle1_80d4b75d-176d-4074-98e3-1b44b83484d2_1024x1024@2x.jpg",
        partId: 2
      },
      {
        url: "https://cdn.adiglobaldistribution.us/pim/500X500/10082/0E-CMR6WHR_alt1.jpg",
        partId: 3
      }
    ], options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "PartImages";
    return queryInterface.bulkDelete(options, {
      partId: {
        [Op.in]: [1, 2, 3]
      }
    }, {});
  }
};
