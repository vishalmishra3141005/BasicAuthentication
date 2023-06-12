
const passport = require("passport");

const googleStrategy = require("passport-google-oauth20");

const User = require("../models/User");

const generatePassword = require("generate-password");

passport.use(new googleStrategy.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CLIENT_URI,
},
    async function(accessToken, refreshToken, profile, done) {
        // console.log(profile);
        let userEmail = profile.emails[0].value;
        // console.log(userEmail);
        try {
            let user = await User.findOne({email: userEmail}).exec();
            if (user) {
                done(null, user);
            } else {
                let randomPass = generatePassword.generate({ length: 20 });
                let user = await User.create({email: userEmail, password: randomPass});
                done(null, user);
            }
        } catch(err) {
            done(err, false);
        }
    }
));


module.exports = passport;
