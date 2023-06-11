
const mongoose = require("mongoose");

const mongoUrl = "mongodb://localhost:27017";

const database = "coms";

async function connectDatabase() {
    try {
        await mongoose.connect(`${mongoUrl}/${database}`, { family: 4 });
        console.log("database connected");
    } catch(err) {
        console.log("Unable to Connect Database");
        console.log(err);
    }
}

connectDatabase();

const db = mongoose.connection;

module.exports = db;
