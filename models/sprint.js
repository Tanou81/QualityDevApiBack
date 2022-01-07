const mongoose = require("mongoose");
const Group = require("../models/group");
const User = require("../models/user");
const Schema = mongoose.Schema;

const sendMailTo = require("../services/mailServices").sendMailTo;

const sprintSchema = new Schema({
  comment: String,
  ratings: [Number],
  doSend: Boolean,
  group: mongoose.Types.ObjectId
});

// After each call of model.findOneAndUpdate
// we check if sprint summary should be sent
sprintSchema.post("findOneAndUpdate", async (result) => {
  if (result && result.doSend) {
    console.log(result.doSend);
    let group = await Group.findById(result.group);
    if (!group || !group.students) throw "group not found (sprintSchema.post-findOneAndUpdate)";
    group.students.forEach(async (studentId) => {
      let student = await User.findById(studentId);
      if (!student || !student.email) throw "student not found (sprintSchema.post-findOneAndUpdate)";
      let email = student.email;
      sendMailTo(email, "QualitéDev - Récapitulatif de sprint" , JSON.stringify(result));
    })
  }
});

const Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;
