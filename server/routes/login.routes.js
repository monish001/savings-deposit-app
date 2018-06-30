var express = require('express');
var loginController = require('../controllers/login.controller');
const authenticate = (req, res, next) => next(); // @todo
const authorize = (req, res, next) => next(); // @todo
const validations = require('./validations/login.validations'); // @todo
const validate = require('express-validation');
const router = express.Router();

router.post('/register', validate(validations.register), loginController.register);
router.get('/email-verification/:guid', loginController.emailVerification);
router.get('/social/callback/google', loginController.googleCallback);
router.get('/social/callback/facebook', loginController.facebookCallback);
router.post('/login', loginController.login);
router.post('/logout', loginController.logout);

module.exports = router;
