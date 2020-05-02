const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/new', (req, res) => {
  res.render('users/new.ejs');
});

router.post('/', (req, res) => {
  const params = {
    name: req.body.userName,
    password: req.body.userPassword
  };
  db.user.create(params).then((results) => {
    res.redirect('/messages');
  });
});

module.exports = router;