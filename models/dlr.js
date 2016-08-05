'use strict';

module.exports = function(sequelize, DataTypes) {
  var Dlr = sequelize.define('Dlr', {
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    messageId: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  return Dlr;
};
