const nodemailer = require('nodemailer');
require("dotenv").config();

const USER = process.env.MAIL_USER;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: USER,
        pass: process.env.MAIL_KEY
    },
});
  
function sendMailTo(to, subject, htmlBody) {
    // Destinations Validation
    if (typeof(to) === "string") {
        if (!validateTo(to)) throw "Destinations emails unrecognized (string)";
    } else if(Array.isArray(to)) {
        if (!validateToArray(to)) throw "Destinations emails unrecognized (array)";
    } else throw "Destinations emails unrecognized (unknown type)";
    // Subject Validation (Gmail accepts up to 70 characters in their subject)
    if (typeof(subject) === "string") {
        if (subject.length > 70) throw "Subject is too long (max = 70 characters)";
    } else throw "Subject must be of type \"string\"";
    if (typeof(htmlBody) !== "string") throw "htmlBody must be of type \"string\"";
    console.log("sending email...");
    transporter.sendMail({
        from: USER, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: htmlBody, // html body
    }).then(info => {
        console.log("sucessefuly sent email")
        console.log({info});
    }).catch( (error) => {
        console.log("failed to send email, error:")
        console.log(error);
    });
}

function validateTo(to) {
    let emailArray = to.split(", ");
    if (!emailArray || emailArray === "" || emailArray.length <= 0) return false;
    emailArray.forEach(supposedEmail => {
        if (!validateToUnique(supposedEmail)) return false;
    });
    return true;
}

function validateToArray(emailArray) {
    if (!emailArray || emailArray === "" || emailArray.length <= 0) return false;
    emailArray.array.forEach(supposedEmail => {
        if (!validateToUnique(supposedEmail)) return false;
    });
    return true;
}

function validateToUnique(singleEmail) {
    const re = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return String(singleEmail).toLowerCase().match(re);
}

module.exports = {sendMailTo};