'use strict';
const {
  Model,
  Validator,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {

    static associate(models) {
      User.hasOne(
        models.UserImage,
        { foreignKey: 'userId', onDelete: 'CASCADE' }
      ),
        User.hasMany(
          models.Ticket,
          { foreignKey: 'technician', onDelete: 'CASCADE' }
        ),
        User.belongsToMany(
          models.Role, {
            through: 'UserRoles',
            foreignKey: 'userId',
            otherKey: 'roleId'
          }
        )
    }
  }
  User.init({
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      // validate: {
      //   isEmail: false
      // }
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      // validate: {
      //   isEmail: false
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
