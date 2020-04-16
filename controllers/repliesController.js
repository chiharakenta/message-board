const db = require('../models/index');

exports.create = (req, res) => {
  const params = {
    message_id: req.body.message_id,
    content: req.body.content
  };
  db.reply.create(params).then((results) => {
    res.redirect('/messages');
  });
}
