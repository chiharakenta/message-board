const passport = require('passport');

exports.new = (req, res) => {
  res.render('sessions/new.ejs');
}

exports.create = passport.authenticate('local', {
  successRedirect: '/messages', failureRedirect: '/login'
});