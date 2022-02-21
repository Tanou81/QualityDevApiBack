//models permetant la vérification des données front group  sont compatible avec  back group 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  manager: mongoose.Types.ObjectId,
  students: [mongoose.Types.ObjectId],
  sprints: [mongoose.Types.ObjectId],
  studentBonusPoints: [Number],
  evaluationFormat: mongoose.Types.ObjectId,
  labelFormat: mongoose.Types.ObjectId
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
