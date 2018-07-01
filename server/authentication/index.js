const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const debug = require("debug")("sd:authentication:index");
var createError = require('http-errors');

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
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
    debug("serializeUser", user);
    cb(
        null,
        JSON.stringify({
            _id: user._id,
            email: user.email
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
            error: "Not Authorized"
        });
    }
}
module.exports = {
    passport,
    authenticate
};