'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    underscored: true,
  });
  message.associate = function(models) {
    message.hasMany(models.reply);
  };
  return message;
};