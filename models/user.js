'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    underscored: true,
  });
  user.associate = function(models) {
    user.hasMany(models.message);
  };
  return user;
};