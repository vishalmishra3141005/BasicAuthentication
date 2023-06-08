
const loginController = require("../controllers/LoginController");

const express = require("express");

const route = express.Router();

route.get("/", loginController.login);
route.get("/login", loginController.login);
route.get("/signup", loginController.signup);
route.get("/profile", loginController.profile);

module.exports = route;