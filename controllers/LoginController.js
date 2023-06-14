

const User = require("../models/User");
const Reset = require("../models/Reset");

const bcrypt = require("bcrypt");

const cryptr = require("cryptr");



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
        res.render("signup", { title: "SignUp", error: "Unable to Signup" });
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



    const Cryptr = new cryptr(process.env.EN_SECRET_KEY);

    const entime = Cryptr.encrypt(Date.now().toString());

    const saveData = async function() {
        try {
            await Reset.create({ email: req.body.email, time: entime });
        } catch(err) {
            console.log("Error occured while saving reset data: " + err);
        }
    }

    saveData();

    const link = `${process.env.HOST_NAME}/lostpassreset?email=${req.body.email}&time=${entime}`;
    const transporter = require("../config/nodemailerconfig");

    const mailer = async function() {

        let info = await transporter.sendMail({
            from: process.env.GMAIL_ID,
            to: req.body.email,
            subject: "Password Reset",
            html: `<a href=${link}>${link}</a>`,
        }, function(err, info) {
            if (err) {
                console.log(err);
            }
        });
    }

    mailer();
    res.redirect("/login");
}


module.exports.lostPassReset = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }
    let email = req.query.email;
    let entime = req.query.time;

    if (!email || !entime) {
        res.render("/");
    }

    const emailData = async function() {
        try {

            let user = await Reset.findOne({email: email, time: entime}).exec();
            if (user) {
                const Cryptr = new cryptr(process.env.EN_SECRET_KEY);
                const dntimeString = Cryptr.decrypt(entime);
                const dntime = parseInt(dntimeString);
                const nowTime = Date.now();
                const expireTime = 1000 * 60 * 5;

                if (nowTime - dntime > expireTime) {
                    res.redirect("/");
                } else {
                    Reset.deleteOne({email: email, time: entime});
                    res.render("lostpassreset", {title: "Lost Password", email: email});
                }
            } else {
                res.redirect("/");
            }
        } catch (err) {
            res.render("/");
        }
    }

    emailData();
}

module.exports.postLostPassReset = function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/");
    }


    const passwordChange = async function() {
        let email = req.body.email;
        bcrypt.hash(req.body.password, 10, async function(err, hash) {
            try {
                let user = await User.findOneAndUpdate({email: email}, {password: hash}).exec();
            } catch(err) {
                console.log(err);
            }
        });
        console.log("updated");
        res.redirect("/");
    }

    passwordChange();

}