const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("./db_config/mongo");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
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
    from: "r20324pavitra@dpsrkp.net",
    to: "samarthya3011@gmail.com",
    subject: "Test Email Subject",
    text: "Example Plain Text Message Body",
  });
  res.send("Hello,This is Team Lazy Sprinters");
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
