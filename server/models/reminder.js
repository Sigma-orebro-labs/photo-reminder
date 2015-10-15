"use strict";
var Sequelize = require('Sequelize');
module.exports = function (sequelize, DataTypes) {
  var Reminder = sequelize.define("Reminder", {
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    reminderDate: Sequelize.DATE
  }, {
      classMethods: {
        associate: function (models) {
          Reminder.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
          Reminder.hasOne(models.Picture, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          })
        }
      }
    });

  return Reminder;
};