const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Is the creation schema for School object in MongoDB.
 */
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

/**
 * Send School object to School collection in MongoDB.
 */
module.exports = mongoose.model("School", schoolSchema);
