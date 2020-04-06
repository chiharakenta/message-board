'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    underscored: true,
  });
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};