const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `done` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
    new LocalStrategy(function verify(email, password, done) {
        userApi
            .findOne("email", email)
            .then(user => {
                if(!user){
                    return done(null, false, { message: 'Incorrect email' });
                }
                if (userUtility.verifyPassword(user, password)) {
                    delete user.Password; // This step is a must. Else encrypted password will be exposed.
                    return done(null, user);
                }
                return done(null, false, { message: 'Incorrect password.' });
            })
            .catch(err => {
                debug("ERROR", err.message, err);
                done(err);
            });
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
    cb(null, JSON.stringify(user));
});
passport.deserializeUser(function (userStr, cb) {
    try {
        cb(null, JSON.parse(userStr));
    } catch (err) {
        debug('deserializeUser', err);
        return cb(err);
    }
});
module.exports = passport;