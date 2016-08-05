'use strict';

module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define('Client', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  return Client;
};
