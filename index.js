
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

require("dotenv").config();

const path = require("path");

const MongoStore = require("connect-mongo");


const passport = require("passport");
const passportLocal = require("./config/passportLocal");
// const passportGoogle = require("../config/")

const expressSession = require("express-session");

const db = require("./config/mongoose");


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
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        dbName: process.env.MONGO_STORE_SESSION_DB,
        collectionName: process.env.MONGO_STORE_SESSION_COLLECTION,
    })
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