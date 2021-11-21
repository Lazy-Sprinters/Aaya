const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const sendEmail = async (ReceiverEmail, mailSubject, mailBody) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SenderEmail,
      pass: process.env.SenderEmailPassword,
    },
  });

  const response = await transporter.sendMail({
    from: "Aaya Developed By Lazy Sprinters",
    to: ReceiverEmail,
    subject: mailSubject,
    text: mailBody,
  });
  console.log(response);
};

module.exports = {sendEmail};