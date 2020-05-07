const db = require('../models/index');
const bcrypt = require('bcrypt');

exports.new = (req, res) => {
  res.render('users/new.ejs');
};

exports.create = (req, res) => {
  bcrypt.hash(req.body.userPassword, 10, (error, hashedPassword) => {
    const params = {
      name: req.body.userName,
      password: hashedPassword
    };
    db.user.create(params).then((results) => {
      res.redirect('/messages');
    });
  });
};