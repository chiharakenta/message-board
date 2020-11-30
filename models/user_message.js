'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_message = sequelize.define('user_message', {
    user_id: DataTypes.INTEGER,
    message_id: DataTypes.INTEGER
  }, {
    underscored: true,
  });
  user_message.associate = function(models) {
    // associations can be defined here
  };
  return user_message;
};