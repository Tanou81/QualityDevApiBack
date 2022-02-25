const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const evaluationSchema = new Schema({
    format: mongoose.Types.ObjectId,
    grades: [],
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;