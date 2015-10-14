"use strict";
var Sequelize = require('Sequelize');
module.exports = function (sequelize, DataTypes) {
  
  var Picture = sequelize.define("Picture", {
    title: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    imageBlob: Sequelize.BLOB
  }, {
      classMethods: {
        associate: function (models) {
          Picture.belongsTo(models.Reminder, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    });

  return Picture;
};