const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  manager: mongoose.Types.ObjectId,
  students: [mongoose.Types.ObjectId],
  sprints: [
    mongoose.Types.ObjectId,
  ],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
