const User = require('../models/user');
const passport = require('passport')

exports.admin_get = (req, res) => {
    passport.authenticate('local', { failureRedirect: '/log-in'});
    res.render("admin", {
        title: "Become an admin",
        error: undefined,
    });
};

exports.admin_post = (req, res, next) => {
    passport.authenticate('local', { failureRedirect: '/log-in' });
    if (req.body.answer != 299792458) {
        res.render("admin", {
            title: "Become an admin",
            error: "Incorrect answer, please try again!",
        });
    } else {
        User.findByIdAndUpdate(req.user.id, { admin: true }, {}, (err, newuser) => {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        })
    }
}