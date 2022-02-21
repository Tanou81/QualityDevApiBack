//models permetant la vérification des données front group  sont compatible avec  back group 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  manager: mongoose.Types.ObjectId,
  students: [mongoose.Types.ObjectId],
  sprints: [mongoose.Types.ObjectId],
  // labels: [String | [String]],
  labels: [String],
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
