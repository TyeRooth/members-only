var express = require('express');
var router = express.Router();

const signupController = require('../controllers/signupController');
const memberController = require('../controllers/memberController');
const loginController = require('../controllers/loginController');
const messageController = require('../controllers/messageController');

const Messages = require('../models/message');

/* GET home page. */
router.get('/', function(req, res, next) {
  Messages.find({}, (err, messages) => {
    if (err) {
      return next(err);
    }
    res.render('index', { title: 'Members-Only', user: req.user, messages });
  })
});

router.get('/sign-up', signupController.signup_get);
router.post('/sign-up', signupController.signup_post);

router.get('/log-in', loginController.login_get);
router.post('/log-in', loginController.login_post);

router.get('/log-out', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get('/member', memberController.member_get);
router.post('/member', memberController.member_post);

router.get('/message', messageController.message_get);

module.exports = router;
