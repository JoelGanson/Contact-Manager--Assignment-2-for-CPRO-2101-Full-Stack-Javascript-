const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

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

const contact_route = require("./routes/contact");

const category_route = require("./routes/category");
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", contact_route);
app.use("/cat/", category_route);

const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
