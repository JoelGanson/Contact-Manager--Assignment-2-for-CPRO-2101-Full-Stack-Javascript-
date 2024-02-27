const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.dbusername}:${process.env.dbpassword}@contactmanager.o7xaklf.mongodb.net/`
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const x = "x";
