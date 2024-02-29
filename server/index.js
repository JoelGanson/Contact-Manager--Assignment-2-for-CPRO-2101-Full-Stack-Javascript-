const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// Make sure that other ports can consume the API using cors
app.use(
  cors({
    origin: "*",
  })
);
// get the connection to the MongoDB server, let the server operator know it's conencted, and report an error if it fails.
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

// Get both models' routes from their respective files
const contact_route = require("./routes/contact");
const category_route = require("./routes/category");
// Make sure the app can read JSON in the body, and returns it.
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Now that we have the routes from the files, apply them and make them work.
app.use("/", contact_route);
app.use("/cat/", category_route);
// Determine a port to listen to, and listen to it.
const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
