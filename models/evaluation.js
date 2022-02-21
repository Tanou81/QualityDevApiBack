const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationSchema = new Schema({
    format: String,
    grades: []
});

const evaluation = mongoose.model("evaluationSchema", evaluationSchema);

module.exports = evaluation;