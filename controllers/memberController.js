const User = require('../models/user');

exports.member_get = (req, res) => {
    res.render("member", {
        title: "Become a member",
    });
};