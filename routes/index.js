
const LoginController = require("../controllers/LoginController");

const express = require("express");

const route = express.Router();

route.get("/", LoginController.login);
route.get("/login", LoginController.login);
route.get("/signup", LoginController.signup);
route.get("/profile", LoginController.profile);

module.exports = route;