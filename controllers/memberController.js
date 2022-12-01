const User = require('../models/user');
const passport = require('passport')

exports.member_get = (req, res) => {
    passport.authenticate('local', { failureRedirect: '/log-in'});
    res.render("member", {
        title: "Become a member",
        error: undefined,
    });
};

exports.member_post = (req, res, next) => {
    passport.authenticate('local', { failureRedirect: '/log-in' });
    if (req.body.answer != 50) {
        res.render("member", {
            title: "Become a member",
            error: "Incorrect answer, please try again!",
        });
    } else {
        User.findByIdAndUpdate(req.user.id, { member: true }, {}, (err, newuser) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        })
    }
}