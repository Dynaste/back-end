const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  name: {
    type: String,
    required: "Name is required.",
  },
  location: {
    type: String,
    required: "Location is required.",
  },
});

module.exports = mongoose.model("School", schoolSchema);
