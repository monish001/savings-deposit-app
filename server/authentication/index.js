const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../models/user.model");
const bcrypt = require('bcrypt');
const debug = require('debug')('sd:authentication:index');

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `done` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
    new LocalStrategy({
        usernameField: 'email'
    }, async function verify(email, password, done) {
        try {
            debug(email, password);
            const errorMessage = 'Incorrect email or password!';
            const user = await userModel.findOne({
                email
            });
            debug(user);

            if (!user) {
                return done(null, false, {
                    message: errorMessage
                });
            }
            const isCorrectPassword = await bcrypt.compare(password, user.password);
            if (isCorrectPassword) {
                delete user.password; // This step is a must. Else encrypted password will be exposed.
                return done(null, user);
            }
            return done(null, false, {
                message: errorMessage
            });
        } catch (error) {
            debug("ERROR", error.message, error);
            done(error);
        }
    })
);
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function (user, cb) {
    debug('serializeUser', user);
    cb(null, JSON.stringify({
        _id: user._id
    }));
});
passport.deserializeUser(function (userStr, cb) {
    debug('deserializeUser', userStr);
    try {
        cb(null, JSON.parse(userStr));
    } catch (err) {
        debug('deserializeUser', err);
        return cb(err);
    }
});
module.exports = passport;