const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('sessions/new.ejs');
});

router.post('/login', (req, res) => {
  console.log('hoge');
  passport.authenticate('local', (err, user, info) => {
    if(err) {
      return err;
    }
    
    if (user) {
      res.redirect('/');
    }

    res.redirect('/');
  });
  console.log('fuga');
});

module.exports = router;