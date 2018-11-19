var express = require('express');
var loginController = require('../controllers/login.controller');
const validations = require('./validations/login.validations'); // @todo
const validate = require('express-validation');
const router = express.Router();
const authentication = require('../helpers/authentication.helper');
const debug = require('debug')('app:routes:login.routes');

router.post('/register', validate(validations.register), loginController.register);
router.get('/email-verification/:guid', validate(validations.emailVerification), loginController.emailVerification);
router.post('/login/google', authentication.google);
router.post('/login/facebook', authentication.facebook);
router.post('/login', validate(validations.login), authentication.passport.authenticate('local'), loginController.login);
router.post('/logout', authentication.authenticate, validate(validations.logout), loginController.logout);

module.exports = router;