// Core Packages
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//Db check
require("./db_config/mongo");

const app = express();
const port = process.env.PORT || 5000;

// Basic Configuration
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//Router Setups
const libraryRouter = require('./routers/library');
const loginRouter = require('./routers/login');


//assigning paths
app.use('/library/upload', libraryRouter);
app.use('/login', loginRouter);


app.get("/", async (req, res) => {
  res.send('Server is up and running')
});

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
