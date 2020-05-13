const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const db = require('../models/index');

router.get('/new', usersController.new);
router.post('/', usersController.create);

router.get('/:id/likes', (req, res) => {
  const options = {
    include: [
      {
        model: db.message,
        through: db.user_message
      }
    ]
  };
  db.user.findByPk(req.params.id, options).then((results) => {
    res.render('users/likes.ejs', {user: results, loggedIn: !!req.user});
  });
});

module.exports = router;