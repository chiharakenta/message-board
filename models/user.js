'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true,
  });
  user.associate = function(models) {
    user.belongsToMany(models.message, { through: models.user_message, as: 'likes' });
    user.hasMany(models.message);
  };
  return user;
};