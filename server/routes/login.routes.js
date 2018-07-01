var express = require('express');
var loginController = require('../controllers/login.controller');
const authorize = (req, res, next) => next(); // @todo
const validations = require('./validations/login.validations'); // @todo
const validate = require('express-validation');
const router = express.Router();
const passport = require('passport');

router.post('/register', validate(validations.register), loginController.register);
router.get('/email-verification/:guid', loginController.emailVerification);
router.get('/social/callback/google', loginController.googleCallback);
router.get('/social/callback/facebook', loginController.facebookCallback);
router.post('/login', passport.authenticate('local'), loginController.login);
router.post('/logout', passport.authenticate('local'), loginController.logout);

module.exports = router;
