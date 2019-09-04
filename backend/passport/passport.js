const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const configs = require('../configs/config');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        // but in our case we gonna use simple email/password from config file

        if (configs.authorization.username === email && configs.authorization.password === password) {
            return cb(null, {email}, {message: 'Logged In Successfully'});
        } else {
            return cb(null, false, {message: 'Incorrect email or password.'});
        }
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: configs.authorization.secret
    },
    ({email}, cb) => {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        // but in our case we gonna use simple email/password from config file

        if (configs.authorization.username === email) {
            return cb(null, {email});
        } else {
            return cb('Incorrect email or password.');
        }
    }
));