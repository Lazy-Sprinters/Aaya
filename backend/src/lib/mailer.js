const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "r20324pavitra@dpsrkp.net", 
      pass: "PASSWORD", 
    },
  });
  

await transporter.sendMail({
    from: 'r20324pavitra@dpsrkp.net',
    to: 'samarthya3011@gmail.com',
    subject: 'Test Email Subject',
    text: 'Example Plain Text Message Body'
});