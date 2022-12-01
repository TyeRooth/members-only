var express = require('express');
var router = express.Router();

const signupController = require('../controllers/signupController');
const memberController = require('../controllers/memberController');
const loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
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

module.exports = router;
