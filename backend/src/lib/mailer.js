const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

// keeping it async to avoid blocking the main thread.
const sendEmail = (ReceiverEmail, mailSubject, mailBody) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SenderEmail,
      pass: process.env.SenderEmailPassword,
    },
  });

  const response = transporter.sendMail({
    from: "Aaya Developed By Lazy Sprinters",
    to: ReceiverEmail,
    subject: mailSubject,
    text: mailBody,
  });
  console.log("Mail Request Initiated");
};

module.exports = {sendEmail};