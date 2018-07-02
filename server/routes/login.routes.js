var express = require('express');
var loginController = require('../controllers/login.controller');
const authorize = (req, res, next) => next(); // @todo
const validations = require('./validations/login.validations'); // @todo
const validate = require('express-validation');
const router = express.Router();
const authentication = require('../authentication');
const debug = require('debug')('sd:routes:login.routes');

router.post('/register', validate(validations.register), loginController.register);
router.get('/email-verification/:guid', validate(validations.emailVerification), loginController.emailVerification);
router.get('/social/callback/google', validate(validations.google), loginController.googleCallback);
router.get('/social/callback/facebook', validate(validations.facebook), loginController.facebookCallback);
router.post('/login', validate(validations.login), authentication.passport.authenticate('local'), loginController.login);
router.post('/logout', authentication.authenticate, validate(validations.logout), loginController.logout);

module.exports = router;
