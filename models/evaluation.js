const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// TODO: Add grades array contained type
const evaluationSchema = new Schema({
    format: mongoose.Types.ObjectId,
    grades: [Number],
});

const Evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = Evaluation;