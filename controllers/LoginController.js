

const User = require("../models/User");

const bcrypt = require("bcrypt");



module.exports.login = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    res.render("login", { title: "Login", error: null, });
}

module.exports.signup = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    res.render("signup", { title: "SignUp", error: null});
}


module.exports.postSignup = async function(req, res) {
    try {
        let user = await User.findOne({email: req.body.email});
        if (user) {
            res.render("signup", { title: "SignUp", error: "Email id already exists"});
        } else {
            bcrypt.hash(req.body.password, 10, async function(err, hash) {
               if (!err) {
                   await User.create({email: req.body.email, password: hash });
               } else {
                   console.log(err);
               }
            });
            res.redirect("/login");
        }
    } catch(err) {
        console.log("Unable to search in database..");
        console.log(err);
        res.render("signup", { title: "SignUp", error: "Unable to Signup"});
    }
}

module.exports.profile = function(req, res) {
    res.render("profile", { title: "Profile" });
}

module.exports.postLogin = function(req, res) {
    res.redirect("/profile");
}

module.exports.postLogout = function(req, res) {
    req.logOut(function(err) {
        if (err) {
            return console.log("error while logout");
        }
    });
    res.redirect("/login");
}

module.exports.googleAuth = function(req, res) {
    res.redirect("/");
}

module.exports.invalidLogin = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    res.render("login", { title: "Login", error: true });
}

module.exports.resetPassword = function(req, res) {
    res.render("reset-password", { title: "Reset Password" });
}

module.exports.postResetPassword = function(req, res) {
    bcrypt.hash(req.body.password, 10, async function(err, hash) {
        if (!err) {
            await User.findOneAndUpdate({email: req.user.email}, { password: hash });
        }
    });
    res.redirect("/");
}

module.exports.lostPass = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    res.render("lost-pass", { title: "Lost Password" });
}

module.exports.postLostPass = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    console.log(req.body);

    console.log(process.env.GMAIL_ID);
    console.log(process.env.GMAIL_PASS);
    const transporter = require("../config/nodemailerconfig");
    const mailer = async function() {
        let info = await transporter.sendMail({
            from: process.env.GMAIL_ID,
            to: req.body.email,
            subject: "Password  Reset",
            html: `Password Reset Link <a href="${process.env.HOST_NAME}\reset-password-link">`,
        }, function(err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    }
    mailer();
    res.redirect("/login");
}