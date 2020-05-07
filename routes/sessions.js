const express = require('express');
const router = express.Router();
const sessionsController = require('../controllers/sessionsController');

router.get('/login', sessionsController.new);
router.post('/login', sessionsController.create);
router.delete('/logout', sessionsController.delete);

module.exports = router;