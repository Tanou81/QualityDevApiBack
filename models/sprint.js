//models permetant la vérification des données sprint group  sont compatible avec  back sprint 
const mongoose = require("mongoose");
const Group = require("../models/group");
const User = require("../models/user");
const LabelFormat = require("../models/labelformat");
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
      sendMailTo(email, "QualitéDev - Récapitulatif de sprint" , await description(group, result));
    })
  }

  async function description(group, result) {
    let msg = "<h1>Récapitulatif de sprint</h1>\n";
    if (group && "labelFormat" in group) {
      try {
        let response = await LabelFormat.findById(group.labelFormat);
        if (response) {
          let labelFormat = response;
          if (result && "comment" in result && Array.isArray(result.ratings)) {
            msg += `<p>Commentaire: "${result.comment}"</p>`;
            for (let i = 0; i < labelFormat.labels.length; i++) {
              msg += `<p>${labelFormat.labels[i].label}: ${result.ratings[i]}</p>`
            }
            return msg;
          }
        } else {
          throw new Error("error trying to fetch labelFormat");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
});

const Sprint = mongoose.model("Sprint", sprintSchema);

module.exports = Sprint;
