
const bcrypt = require("bcrypt");
const User = require("../models/User");

const passport = require("passport");
const passportLocal = require("passport-local");

passport.use(new passportLocal.Strategy(
    {
        usernameField: "email",
        passportField: "password",
    }, function(email, password, done) {
        User.findOne({email: email}).exec()
            .then(function(user) {
                if (user) {
                    bcrypt.compare(password, user.password, function(err, result) {
                        if (err) {
                            return done(null, false);
                        } else {
                            if (result) {
                                return done(null, user);
                            } else {
                                return done(null, false);
                            }
                        }
                    });
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => { return done(err); });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    try {
        let user = await User.findById(id).exec();
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;