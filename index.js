
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const path = require("path");

const passport = require("passport");
const passportLocal = require("./config/passportLocal");

const expressSession = require("express-session");

const db = require("./config/mongoose");


require("dotenv").config();

const app = express();

const port = 4000;

app.use(express.urlencoded({extended: true}));

app.use(expressSession({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    name: "ID",
    cookie: {
        maxAge: (1000 * 3600),
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set("layout extractScripts", true);
app.set("layout extractStyles", true);

app.use(express.static(path.join(__dirname, "public")));

app.use(require("./routes"));

app.listen(port, function(err) {
    if (err) {
        console.log(`Error Occured - ${err}`);
    } else {
        console.log(`Server up and running at ${port}`);
    }
})