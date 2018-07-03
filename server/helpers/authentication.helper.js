const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const debug = require("debug")("sd:helpers:authentication.index");
const createError = require('http-errors');
const config = require('config');
var loginController = require('../controllers/login.controller');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `done` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
    new LocalStrategy({
            usernameField: "email"
        },
        async function verify(email, password, done) {
            try {
                debug(email, password);
                const errorMessage = "Incorrect email or password!";
                const user = await userModel.findOne({
                    email
                });

                if (!user) {
                    debug('user', user, errorMessage);
                    return done(null, false, {
                        message: errorMessage
                    });
                }
                if (!user.isEmailVerified) {
                    const message = `Please verify your email by opening a link already sent to your email.`;
                    debug('user.isEmailVerified', user.isEmailVerified, message);
                    return done(null, false, {
                        message
                    });
                }
                if (user.retryCount >= 3) {
                    const message = `Your login is blocked. Please contact administrator to unblock your login.`
                    debug('user.retryCount', user.retryCount, message);
                    return done(null, false, {
                        message
                    });
                }
                const isCorrectPassword = await bcrypt.compare(password, user.password);
                if (isCorrectPassword) {
                    delete user.password; // This step is a must. Else encrypted password will be exposed.
                    if (user.retryCount) {
                        const affectedCount = await userModel.update({
                            'retryCount': 0
                        }, {
                            _id: user._id
                        });
                        debug(affectedCount ? 'retryCount updated to 0' : 'retryCount update failed.', affectedCount);
                    }
                    return done(null, user);
                }


                const affectedCount = await userModel.increment('retryCount', {
                    _id: user._id
                });
                debug('affectedCount', affectedCount);

                debug('isCorrectPassword', isCorrectPassword, errorMessage);
                return done(null, false, {
                    message: errorMessage
                });
            } catch (error) {
                debug("ERROR", error.message, error);
                done(error);
            }
        }
    )
);

// passport.use(new FacebookStrategy({
//         clientID: config.authentication.facebook.clientId,
//         clientSecret: config.authentication.facebook.secret,
//         callbackURL: "http://localhost:3000/login/facebook/callback",
//         profileFields: ['id', 'photos', 'email']
//     },
//     function (accessToken, refreshToken, profile, cb) {
//         debug('profile', profile);
//         // @todo
//         // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         //   return cb(err, user);
//         // });
//     }
// ));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
    debug("serializeUser", user);
    const {
        _id,
        email,
        role
    } = user;
    cb(
        null,
        JSON.stringify({
            _id,
            email,
            role,
        })
    );
});
passport.deserializeUser(function (userStr, cb) {
    debug("deserializeUser", userStr);
    try {
        cb(null, JSON.parse(userStr));
    } catch (err) {
        debug("deserializeUser", err);
        return cb(err);
    }
});

function authenticate(req, res, next) {
    debug('authenticate');
    if (
        req.user &&
        req.user._id
    ) {
        next();
        // } else if (!req.body.XHRRequest) { // UI layer authentication
        //     // req.originalUrl is a combination of req.baseUrl and req.path along with query parameters.
        //     req.session.currentPath = req.originalUrl;
        //     res.redirect(constants.basePath + "login");
    } else {
        res.status(401).json({
            error: "Unauthorized"
        });
    }
}

function google(req, res, next) {
    const token = req.body.id_token;
    const {
        OAuth2Client
    } = require('google-auth-library');
    const client = new OAuth2Client(config.authentication.google.clientId);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.authentication.google.clientId,
        });
        const payload = ticket.getPayload();
        debug('payload', payload);
        const {
            sub,
            email,
            email_verified,
            picture
        } = payload;

        loginController.onGoogleSignIn({
            googleId: sub,
            email,
            email_verified,
            photo: picture
        }).then(user => {
            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                const {
                    email,
                    role,
                    photo,
                    googleId,
                } = user;
                return res.json({
                    ok: true,
                    profile: {
                        email,
                        role,
                        photo,
                        googleId,
                    },
                    message: 'Successfully logged in.'
                });
            });
        }).catch(error => {
            next(new createError.BadRequest(error));
        });
    }
    verify().catch(next);
}
module.exports = {
    passport,
    authenticate,
    google,
};