const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const arrayLimit = (val) => {
    return val.length <= 5;
}

const groupSchema = new Schema({
  members: {
    type: [Schema.Types.Mixed],
    required: true,
    validate: [arrayLimit, `Can't handle more than 5`]
  }
});

module.exports = mongoose.model("Group", groupSchema);