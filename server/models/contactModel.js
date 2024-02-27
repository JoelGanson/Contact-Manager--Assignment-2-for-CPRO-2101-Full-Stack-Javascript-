const mongoose = require("mongoose");
const contactSchema = mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  CategoryId: {
    type: String,
    required: true,
  },
  Organization: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("post", postSchema);
