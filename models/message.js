'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  message.associate = function(models) {
    message.belongsTo(models.user);
    message.hasMany(models.reply);
    message.belongsToMany(models.user, { through: models.user_message } );
  };
  return message;
};