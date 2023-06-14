
const mongoose = require("mongoose");

const Reset = mongoose.model("Reset", new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    }
}, { timestamps: true }));

module.exports = Reset;