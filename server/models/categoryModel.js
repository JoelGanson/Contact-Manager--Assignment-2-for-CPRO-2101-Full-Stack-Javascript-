const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  // This model only needs one parameter
  categoryName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("category", categorySchema);
