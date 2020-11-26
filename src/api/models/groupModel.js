const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const arrayLimit = (val) => {
    return val.length <= 5;
}

const groupSchema = new Schema({
  members: {
    type: [Object],
    required: true,
    validate: [arrayLimit, `5 members maximum !`]
  },
  questions: {
    type: Object,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  associatedSchoolId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Group", groupSchema);