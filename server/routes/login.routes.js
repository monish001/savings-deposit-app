var express = require('express');
var loginController = require('../controllers/login.controller');
const authorize = (req, res, next) => next(); // @todo
const validations = require('./validations/login.validations'); // @todo
const validate = require('express-validation');
const router = express.Router();
const authentication = require('../authentication');

router.post('/register', validate(validations.register), loginController.register);
router.get('/email-verification/:guid', loginController.emailVerification);
router.get('/social/callback/google', loginController.googleCallback);
router.get('/social/callback/facebook', loginController.facebookCallback);
router.post('/login', authentication.passport.authenticate('local'), loginController.login);
router.post('/logout', authentication.authenticate, loginController.logout);

module.exports = router;
