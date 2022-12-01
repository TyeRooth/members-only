const User = require('../models/user');

const passport = require('passport');

exports.login_get = (req, res) => {
    res.render("login", {
        title: "Log In",
        errors: undefined,
    });
};

exports.login_post = [
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in",
    }),
]
