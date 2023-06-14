
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS,
    },
});

module.exports = transporter;
