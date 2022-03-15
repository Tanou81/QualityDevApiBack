const mongoose = require("mongoose");
const SchoolYear = require("../models/schoolyear");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  manager: mongoose.Types.ObjectId,
  students: [mongoose.Types.ObjectId],
  sprints: [mongoose.Types.ObjectId],
  studentBonusPoints: [Number],
  evaluation: mongoose.Types.ObjectId,
  labelFormat: mongoose.Types.ObjectId,
  schoolYear: mongoose.Types.ObjectId
});
groupSchema.post("validate", async (result) => {
  if (!("schoolYear" in result) || result.schoolYear == null) {
    console.log("ok");
    const todayDate = new Date();
    let schoolYear = {};
    if (todayDate.getMonth() >= 8) {
      console.log(">=8");
      schoolYear.startYear = `${todayDate.getFullYear()}`;
      schoolYear.endYear = `${todayDate.getFullYear() + 1}`;
      schoolYear.name = `${schoolYear.startYear}-${schoolYear.endYear}`;
    } else {
      console.log("<8");
      schoolYear.startYear = `${todayDate.getFullYear() - 1}`;
      schoolYear.endYear = `${todayDate.getFullYear()}`;
      schoolYear.name = `${schoolYear.startYear}-${schoolYear.endYear}`;  
    }
    try {
      let response = await SchoolYear.find({startYear: schoolYear.startYear});
      let schoolYearId = null;
      if (response && response[0]) {
        // taking first object
        schoolYearId = response[0]._id.toString()
      } else {
        console.log("no schoolYear found, creating one");
        let response = await SchoolYear.create({
          name: schoolYear.name,
          startYear: schoolYear.startYear,
          endYear: schoolYear.endYear
        });
        schoolYearId = response._id.toString();
      }
      result.schoolYear = mongoose.Types.ObjectId(schoolYearId);
      // return result;
    } catch (error) {
      console.error(error);
    }
  }
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
