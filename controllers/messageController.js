const Message = require('../models/message');
const passport = require('passport');

exports.message_get = (req, res) => {
    res.render('message', { title: "Create your message", message: undefined, errors: undefined});
};