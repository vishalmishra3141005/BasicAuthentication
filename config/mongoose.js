
const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL;

const database = process.env.MONGO_DB;

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
