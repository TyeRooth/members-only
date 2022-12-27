const Message = require('../models/message');
const passport = require('passport');

exports.message_get = (req, res) => {
    passport.authenticate('local', { failureRedirect: '/log-in'});
    res.render('message', { title: "Create your message", message: undefined, errors: undefined});
};

exports.message_post = (req, res, next) => {
    passport.authenticate('local', { failureRedirect: '/log-in'});
    const message = new Message({
        text: req.body.message,
        timestamp: new Date(),
        user: req.user,
    });
    message.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect('/');
        }
    });
}