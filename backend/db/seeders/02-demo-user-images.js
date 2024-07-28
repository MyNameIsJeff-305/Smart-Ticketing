'use strict';

/** @type {import('sequelize-cli').Migration} */

const { UserImage } = require('../models');

let options = {};
options.tableName = 'UserImages';
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await UserImage.bulkCreate([
      {
        userId: 1
      },
      {
        userId: 2,
        url: "https://i.pinimg.com/564x/0b/91/42/0b9142c449f493a20ebe67a6d68bf9d3.jpg"
      },
      {
        userId: 3,
        url: "https://caricaturasdavid.com/wp-content/uploads/2020/04/caricaturas-de-famosos1.jpg"
      },
      {
        userId: 4,
        url: "https://s-media-cache-ak0.pinimg.com/originals/29/88/ab/2988ab54d9df4bd3b66f2486cdc93ad8.jpg"
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'UserImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
