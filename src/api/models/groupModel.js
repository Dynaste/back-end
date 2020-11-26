const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Is the creation schema for School object in MongoDB.
 */
const groupSchema = new Schema({
  members: {
    type: [
      { firstname: String, lastname: String, email: String, phone_number: String }
    ],
    required: "5 members are required.",
    validate : [arrayLimit, `Can't exceed the limit of 5 members`]
  },
  projectInformation: {
    type: [{answer: {type: String}}],
    required: "All answers are required.",
    validate : [arrayLimit, `Can't exceed the limit of 5 questions/answers`]
  },
  about: {
    type: String,
    required: "Description of your team is required."
  }
});

const arrayLimit = (val) => {
  return val.length <= 5;
}

/**
 * Send School object to School collection in MongoDB.
 */
module.exports = mongoose.model("Group", groupSchema);
