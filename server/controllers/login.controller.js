const userModel = require("../models/user.model");
const debug = require('debug')('sd:controllers:login.controller');
const bcrypt = require('bcrypt');
const config = require('config');
var createError = require('http-errors');
var emailHelper = require('../helpers/email.helper');
const uuidv4 = require('uuid/v4');
const passport = require('../authentication');

const loginController = {
    register: async (req, res, next) => {
        // check if already present, then error
        // create user record
        const {
            email,
            password,
            cpassword
        } = req.body;

        if(password !== cpassword) {
            next(new createError.BadRequest('Passwords do not match!'));
            return;
        }

        const passwordHash = await bcrypt.hash(password, Number(config.api.salt));

        const user = await userModel.findOne({
            email
        });
        if (user && user.email) {
            // already user present
            next(new createError.Conflict('You already have an account. Hit Sign in!'));
        } else {
            const {
                subject,
                text,
                html
            } = config.email.verify;
            const emailVerificationCode = (uuidv4() + uuidv4());
            const emailLink = `${config.domain}/api/email-verification/${emailVerificationCode}`;
            const emailText = text.replace(/%EmailLink%/g, emailLink);
            const emailHtml = html.replace(/%EmailLink%/g, emailLink);
            const isOk = await emailHelper.sendEmail(email, subject, emailText, emailHtml);
            if (isOk) {
                const user = await userModel.create({
                    email,
                    password: passwordHash,
                    emailVerificationCode
                });
                debug('register', 'user created', user);
                res.json('Registration is successful.');
            } else {
                debug('register', 'Error in sending email');
                next(new createError.InternalServerError());
            }
        }
    },
    emailVerification: async (req, res, next) => {
        const emailVerificationCode = req.params.guid;
        const affectedCount = await userModel.update({
            isEmailVerified: true,
            emailVerificationCode: ''
        }, {
            emailVerificationCode
        });
        if(affectedCount){
            return res.json(`Email is successfully verified! Please login here - ${config.domain}.`);
        } else {
            next(new createError.BadRequest('Email verification failed.'));
        }
    },
    login: (req, res, next) => {
        const {
            email,
            password
        } = req.body;

        passport.authenticate("local", function (err, user, info) {
            if (err) {
                return next(err);
            }
            debug('login', user);
            if (!user) {
                return next(new createError.Forbidden());
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.json('Sign in successful.');
            });
        })(req, res, next);
    },
    logout: (req, res, next) => {
        req.logout();
        res.json('Logout is successful.');
    },
    googleCallback: (req, res, next) => {
        next(new createError.NotImplemented());
    },
    facebookCallback: (req, res, next) => {
        next(new createError.NotImplemented());
    },
};

module.exports = loginController;