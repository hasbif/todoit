"use strict";

const { hashPassword } = require("../helpers/bcrypts");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty"
          }
        }
      },
    },
    {
      hooks: {
        beforeCreate(user, option) {
          user.password = hashPassword(user.password);
        }
      }
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Todo);
  };
  return User;
};
