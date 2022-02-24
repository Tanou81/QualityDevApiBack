const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationSchema = new Schema({
    format: mongoose.Types.ObjectId,
    grades: [],
});

const evaluation = mongoose.model("evaluation", evaluationSchema);

module.exports = evaluation;