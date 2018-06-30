var nodemailer = require("nodemailer");
var config = require('config');
const debug = require('debug')('sd:helpers:email.helper');

// Use Smtp Protocol to send Email
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: config.api.fromEmail,
        pass: config.api.emailPassword
    }
});

async function sendEmail(to, subject, text, html) {
    var mail = {
        from: config.api.fromEmail,
        to,
        subject,
        text,
        html
    };

    try {
        const response = await smtpTransport.sendMail(mail);
        smtpTransport.close();
        debug('sendEmail Success', response);
        return true;
    } catch (error) {
        debug('sendEmail Error', error);
        return false;
    }
}

module.exports = {
    sendEmail
};