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

exports.show = (req, res) => {
  const options = {
    include: [
      {
        model: db.message
      }
    ]
  };
  db.user.findByPk(req.params.id, options).then((results) => {
    res.render('users/show.ejs', {user: results, currentUser: req.user});
  });
}

exports.likes = (req, res) => {
  const options = {
    include: [
      {
        model: db.message,
        through: db.user_message,
        as: 'likes'
      }
    ]
  };
  db.user.findByPk(req.params.id, options).then((results) => {
    res.render('users/likes.ejs', {user: results, currentUser: req.user});
  });
}