"use strict";
var Sequelize = require('Sequelize');
module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    googleId: Sequelize.STRING,
    displayName: Sequelize.STRING,
    imageUrl: Sequelize.STRING
  }, {
      classMethods: {
        associate: function (models) {
          User.hasMany(models.Reminder)
        },
        seedDev: function () {
          User.findOrCreate(
            {
              where: {
                email: 'anders.rydman@gmail.com',
                password: 'Sigma2015'
              }
            }
            ).then(function (user, err) {
              if (err) {
                console.log('seed error: ', err);
              }
              else
                console.log('Created Dev User:', user);
            });
        }
      },
      instanceMethods: {
        verifyPassword: function (password) {
          if (this.password == password) return true;
          else return false;
        }
      }
    });

  return User;
};