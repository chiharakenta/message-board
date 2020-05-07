const db = require('../models/index');

exports.new = (req, res) => {
  res.render('users/new.ejs');
};

exports.create = (req, res) => {
  const params = {
    name: req.body.userName,
    password: req.body.userPassword
  };
  db.user.create(params).then((results) => {
    res.redirect('/messages');
  });
};