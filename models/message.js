'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  message.associate = function(models) {
    message.belongsTo(models.user);
    message.hasMany(models.reply);
  };
  return message;
};