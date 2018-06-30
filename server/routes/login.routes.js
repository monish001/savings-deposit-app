var express = require('express');
var loginController = require('../controllers/login.controller');
var savingDepositController = require('../controllers/saving-deposit.controller');
var userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', loginController.register);
// router.get('/email-verification/:guid', loginController.emailVerification);
// router.get('/social/callback/google', loginController.googleCallback);
// router.get('/social/callback/facebook', loginController.facebookCallback);
router.post('/login', loginController.login);

module.exports = router;
