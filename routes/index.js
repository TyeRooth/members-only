var express = require('express');
var router = express.Router();

const signupController = require('../controllers/signupController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sign-up', signupController.signup_get);
router.post('/sign-up', signupController.signup_post);

module.exports = router;
