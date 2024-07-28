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
        url: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.6435-9/88113742_908716922917403_1063067567549054976_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=3CseZjkGUW0Q7kNvgF2yzDP&_nc_ht=scontent-atl3-1.xx&oh=00_AYDPqy5xiiqLQ7Q47bbiBH0Qivy52Nw59FP7VJnhj37ROw&oe=66CE1A2F"
      },
      {
        userId: 3,
        url: "https://canadiandimension.com/images/reviews/_resized/Sugar_Man_cover.jpg"
      },
      {
        userId: 4,
        url: "https://scontent-atl3-1.xx.fbcdn.net/v/t31.18172-8/25626806_913972295432527_4084070250719205380_o.jpg?_nc_cat=107&ccb=1-7&_nc_sid=53a332&_nc_ohc=Wh6mnSXrzaoQ7kNvgFjj32C&_nc_ht=scontent-atl3-1.xx&oh=00_AYAh-Y5v6PGaomj8T91Yem9HGGK2tTlsCA9rS6E-FliPVw&oe=66CDF98E"
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
