const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolyearSchema = new Schema({
  name: String,
  startYear: Number,
  endYear: Number
});

const SchoolYear = mongoose.model("SchoolYear", schoolyearSchema);

module.exports = SchoolYear;