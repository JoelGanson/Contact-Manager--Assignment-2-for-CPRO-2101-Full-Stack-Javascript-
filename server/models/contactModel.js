const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact", contactSchema);
