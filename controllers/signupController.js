const User = require('../models/user');

const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

exports.signup_get = (req, res) => {
    res.render("signup", {
        title: "Sign Up",
        user: undefined,
        errors: undefined,
    });
}

exports.signup_post = [
    body("firstname", "First name is required").trim().isLength({ min: 1 }).escape(),
    body("lastname", "Last Name is required").trim().isLength({ min: 1 }).escape(),
    body("username", "Username is required").trim().isLength({ min: 1 }).escape(),
    body("username", "Not a valid email address").isEmail().normalizeEmail(),
    body("username").custom(value => {
        return User.findOne({ username: value }).then(user => {
            if (user) {
                return Promise.reject("User already exists");
            }
        });
    }),
    body("password", "Password is required").trim().isLength({ min: 1 }).escape(),
    body("confirm").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
                return next(err);
            }

            const user = new User({
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                username: req.body.username,
                password: hashedPassword,
                member: false,
                admin: false,
            });
    
            if (!errors.isEmpty()) {
                res.render("signup", {
                    title: "Sign Up",
                    user,
                    errors: errors.array(),
                });
                return;
            } else {
                user.save((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect("/")
                });
            }
        });
    }
]