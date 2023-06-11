
const LoginController = require("../controllers/LoginController");
const passport = require("passport");
const passportLocal = require("../config/passportLocal");

const Authentication = require("../middleware/Authentication");

const express = require("express");

const route = express.Router();

route.get("/", Authentication.checkAuthenticated, LoginController.profile);

route.get("/login", LoginController.login);

route.post("/login", passport.authenticate("local", {
        failureRedirect: "/login",
    }),
    LoginController.postLogin,
);

route.get("/signup", LoginController.signup);

route.post("/signup", LoginController.postSignup);

route.get("/profile", Authentication.checkAuthenticated, LoginController.profile);


route.post("/logout", LoginController.postLogout);


module.exports = route;