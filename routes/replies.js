const express = require('express');
const router = express.Router();
const repliesController = require('../controllers/repliesController');

// 新規作成
router.post('/', (req, res) => {
  repliesController.create(req, res);
});

module.exports = router;