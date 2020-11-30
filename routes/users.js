const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const db = require('../models/index');

router.get('/new', usersController.new);
router.post('/', usersController.create);
router.get('/:id', usersController.show);
router.get('/:id/likes', usersController.likes);

module.exports = router;