

const User = require("../models/User");
const bcrypt = require("bcrypt");


module.exports.login = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    res.render("login", { title: "Login" });
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

